import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new quizz.
export const createQuizz = mutation({
  args: {
    question: v.array(v.string()),
    answers: v.array(v.array(v.string())),
    correctAnswer: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("quizz", args);
  },
});

// This mutation returns the quizz by its most recent timestamp.
export const getQuizz = query({
  handler: async (ctx) => {
    return await ctx.db.query("quizz").order("desc").first();
  },
});
