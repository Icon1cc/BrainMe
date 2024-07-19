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
        await ctx.db.insert("leaderboard", {
          user_id: user!._id,
          points: 0,
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
        const board = await ctx.db
          .query("leaderboard")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
        if (board) {
          await ctx.db.delete(board._id);
        }
      }
    }
  },
});

// Update your user's leaderboard.
export const update = mutation({
  args: {
    points: v.optional(v.number()),
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
        const board = await ctx.db
          .query("leaderboard")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
        if (board) {
          await ctx.db.patch(board._id, {
            ...args,
          });
        }
      }
    }
  },
});

// Get your user's leaderboard.
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
          .query("leaderboard")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .unique();
      }
    }
    return null;
  },
});

// Retrieve all users statistics.
export const collect = query({
  args: {
    withoutUser: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
      .unique();
    if (user && args.withoutUser) {
      return await ctx.db
        .query("leaderboard")
        .filter((q) => q.neq(q.field("user_id"), user?._id))
        .collect();
    } else if (user) {
      return await ctx.db.query("leaderboard").collect();
    }
  },
});

// Returns the leaderboard.
export const getLeaderboard = query({
  handler: async (ctx) => {
    return await ctx.db.query("leaderboard").collect();
  },
});
