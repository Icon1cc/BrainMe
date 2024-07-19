import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new quizz.
export const insert = mutation({
  args: {
    user_id: v.id("user"),
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

// Mutation returning quizz by user_id.
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
          .query("quizz")
          .filter((q) => q.eq(q.field("user_id"), user._id))
          .order("desc")
          .first();
      }
    }
    return null;
  },
});
