import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add a new user to the leaderboard.
export const add = mutation({
  args: {
    user_id: v.id("user"),
    ranking: v.number(),
    gamesPlayed: v.number(),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("leaderboard", {
      ...args,
    });
  },
});

// Returns the leaderboard.
export const getLeaderboard = query({
  handler: async (ctx) => {
    return await ctx.db.query("leaderboard").collect();
  },
});
