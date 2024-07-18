import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new quizz.
export const insert = mutation({
  args: {
    category: v.string(),
    difficulty: v.string(),
    questions: v.array(v.string()),
    answers: v.array(
      v.object({
        incorrectAnswers: v.array(v.string()),
        correctAnswer: v.string(),
      })
    ),
    userAnswers: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("quizz", args);
  },
});

// This mutation updates a quizz.
export const update = mutation({
  args: {
    _id: v.id("quizz"),
    userAnswers: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      userAnswers: args.userAnswers,
    });
  },
});

// This mutation returns the quizz by its most recent timestamp.
export const retrieve = query({
  handler: async (ctx) => {
    return await ctx.db.query("quizz").order("desc").first();
  },
});
