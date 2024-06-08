import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    user_id: v.string(),
    username: v.string(),
    name: v.string(),
    ranking: v.number(),
    gamesPlayed: v.number(),
    points: v.number(),
    completionRate: v.number(),
    correctAnswers: v.number(),
    wrongAnswers: v.number(),
    friends_ids: v.optional(v.array(v.id("user"))),
  }),
  chats: defineTable({
    user_1: v.id("user"),
    user_2: v.id("user"),
  }),
  messages: defineTable({
    chat_id: v.id("chats"),
    user: v.string(),
    content: v.string(),
    file: v.optional(v.string()),
  }),
});
