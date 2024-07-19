import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    tokenIdentifier: v.string(),
    username: v.string(),
    friends: v.optional(v.array(v.id("user"))),
    file: v.optional(v.string()),
  }),
  chats: defineTable({
    user_1: v.id("user"),
    user_2: v.id("user"),
    last_comment: v.optional(v.string()),
    timestamp: v.string(),
  }),
  messages: defineTable({
    chat_id: v.id("chats"),
    user: v.string(),
    content: v.string(),
    file: v.optional(v.string()),
  }),
  quizz: defineTable({
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
  }),
  leaderboard: defineTable({
    user_id: v.id("user"),
    points: v.number(),
  }),
  userstatistics: defineTable({
    user_id: v.id("user"),
    games: v.number(),
    points: v.number(),
    level: v.number(),
    correctAnswers: v.number(),
  }),
});
