import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation inserts a new user into the database.
export const add = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      await ctx.db.insert("user", {
        username: "Alexandre Boving",
        ranking: 0,
        gamesPlayed: 0,
        points: 0,
        completionRate: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        user_id: tokenIdentifier,
      });
    }
  },
});

/* This mutation updates a user's friend list in the database.
export const updateFriends = mutation({
  args: {
    _id: v.id("user"),
    friends_ids: v.array(v.id("user")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      friends_ids: args.friends_ids,
    });
  },
});*/

// This mutation updates a user in the database
export const update = mutation({
  args: {
    _id: v.id("user"),
    rank: v.optional(v.number()),
    gamesPlayed: v.optional(v.number()),
    points: v.optional(v.number()),
    completionRate: v.optional(v.number()),
    correctAnswers: v.optional(v.number()),
    wrongAnswers: v.optional(v.number()),
    friends: v.optional(v.array(v.id("user"))),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      ...args,
    });
  },
});

// This query returns your user from the database
export const myUser = query({
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
      return user;
    }
  },
});

// This query retrieves a user from the database
export const get = query({
  args: {
    _id: v.id("user"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("_id"), args._id))
      .unique();
    if (user) {
      return user;
    } else {
      return null;
    }
  },
});

// This query retrieves all users from the database
export const collect = query({
  handler: async (ctx) => {
    return await ctx.db.query("user").collect();

    /*return Promise.all(
      users.map(async (user) => {
        if (user.file) {
          const url = await ctx.storage.getUrl(user.avatar);
          if (url) {
            return { ...user, avatar: url };
          }
          return user;
        }
      })
    );*/
  },
});
