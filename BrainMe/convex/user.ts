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

// This mutation deletes your user from the database
export const remove = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("user_id"), tokenIdentifier))
        .unique();
      if (user) {
        await ctx.db.delete(user._id);
      }
    }
  },
});

// This mutation updates a user in the database
export const update = mutation({
  args: {
    _id: v.id("user"),
    username: v.optional(v.string()),
    rank: v.optional(v.number()),
    gamesPlayed: v.optional(v.number()),
    points: v.optional(v.number()),
    completionRate: v.optional(v.number()),
    correctAnswers: v.optional(v.number()),
    wrongAnswers: v.optional(v.number()),
    friends: v.optional(v.array(v.id("user"))),
    file: v.optional(v.string()),
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
      if (user?.file && user.file) {
        const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
        if (url) {
          return { ...user, file: url };
        }
      }
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
    if (user?.file && user.file) {
      const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
      if (url) {
        return { ...user, file: url };
      }
    }
    return user;
  },
});

// This query return all the users except the current user.
export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const users = await ctx.db
      .query("user")
      .filter((q) => q.neq(q.field("user_id"), tokenIdentifier))
      .collect();

    // if the user has a file, get the URL from the storage.
    return Promise.all(
      users.map(async (user) => {
        if (user.file) {
          const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
          if (url) {
            return { ...user, file: url };
          }
        }
        return user;
      })
    );
  },
});

// This query returns multiple users by their IDs.
export const getUserByIds = query({
  args: { userIds: v.optional(v.array(v.id("user"))) },
  handler: async (ctx, args) => {
    if (args.userIds) {
      return Promise.all(
        args.userIds.map(async (userId) => {
          const user = await ctx.db.get(userId);
          if (user && user.file) {
            const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
            if (url) {
              return { ...user, file: url };
            }
          }
          return user;
        })
      );
    } else {
      return [];
    }
  },
});

// This query returns all the users in the database.
export const all = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    return Promise.all(
      users.map(async (user) => {
        if (user.file) {
          const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
          if (url) {
            return { ...user, file: url };
          }
        }
        return user;
      })
    );
  },
});
