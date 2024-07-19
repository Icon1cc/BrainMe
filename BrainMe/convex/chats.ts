import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

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

// This query returns chat group by the user ids.
export const getChatByUsers = query({
  args: {
    user_1: v.id("user"),
    user_2: v.id("user"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chats")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("user_1"), args.user_1),
            q.eq(q.field("user_2"), args.user_2)
          ),
          q.and(
            q.eq(q.field("user_1"), args.user_2),
            q.eq(q.field("user_2"), args.user_1)
          )
        )
      )
      .unique();
  },
});

// This query returns chat groups related to your profile.
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
        const chats = await ctx.db
          .query("chats")
          .filter((q) =>
            q.or(
              q.eq(q.field("user_1"), user._id),
              q.eq(q.field("user_2"), user._id)
            )
          )
          .order("desc")
          .collect();
          const otherUsers = chats.map(async (chat) => {
            const otherUser = ctx.db.get(
              chat.user_1 === user._id ? chat.user_2 : chat.user_1
            );

          })
        return Promise.all(
          chats.map(async (chat) => {
            const otherUser = ctx.db.get(
              chat.user_1 === user._id ? chat.user_2 : chat.user_1
            );
            if(otherUser.file)
          })
        );
      }
    }
  },
});

users.map(async (user) => {
  if (user.file) {
    const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
    if (url) {
      return { ...user, file: url };
    }
  }
  return user;
});

// This query returns the chat group by it's object id.
export const getChatById = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});
