import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add a new user to the leaderboard.
export const insert = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
        .unique();
      if (user) {
        await ctx.db.insert("userstatistics", {
          user_id: user!._id,
          games: 0,
          points: 0,
          level: 0,
          correctAnswers: 0,
        });
      }
    }
  },
});

// Remove your user from the leaderboard.
export const remove = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
        .unique();
      if (user) {
        const statistics = await ctx.db
          .query("userstatistics")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
        if (statistics) {
          await ctx.db.delete(statistics._id);
        }
      }
    }
  },
});

// Update your user's statistics.
export const update = mutation({
  args: {
    games: v.optional(v.number()),
    points: v.optional(v.number()),
    level: v.optional(v.number()),
    correctAnswers: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
        .unique();
      if (user) {
        const statistics = await ctx.db
          .query("userstatistics")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
        if (statistics) {
          await ctx.db.patch(statistics._id, {
            ...args,
          });
        }
      }
    }
  },
});

// Get your user's statistics.
export const retrieve = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
        .unique();
      if (user) {
        return await ctx.db
          .query("userstatistics")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
      }
    }
    return null;
  },
});

// Get your user's statistics.
export const retrieveByUserId = query({
  args: {
    user_id: v.id("user"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userstatistics")
      .filter((q) => q.eq(q.field("user_id"), args.user_id))
      .unique();
  },
});
