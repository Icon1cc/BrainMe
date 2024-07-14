import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation creates a new chat.
export const createChat = mutation({
  args: {
    user_1: v.id("user"),
    user_2: v.id("user"),
    last_comment: v.string(),
    timestamp: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chats", args);
  },
});

// This mutation updates a chat group.
export const updateChat = mutation({
  args: {
    chatId: v.id("chats"),
    last_comment: v.string(),
    timestamp: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.chatId, {
      last_comment: args.last_comment,
      timestamp: args.timestamp,
    });
  },
});

// This query returns chat groups related to your profile.
export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    } else {
      const { tokenIdentifier } = identity!;
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("user_id"), tokenIdentifier))
        .unique();
      if (user) {
        return await ctx.db
          .query("chats")
          .filter((q) =>
            q.or(
              q.eq(q.field("user_1"), user._id),
              q.eq(q.field("user_2"), user._id)
            )
          )
          .order("desc")
          .collect();
      } else {
        return null;
      }
    }
  },
});

// This query returns the chat group by it's object id.
export const getChatById = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});
