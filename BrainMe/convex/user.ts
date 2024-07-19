import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This mutation inserts a new user into the database.
export const insert = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      await ctx.db.insert("user", {
        username: identity!.name!,
        tokenIdentifier: tokenIdentifier,
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
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
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
export const retrieve = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    if (tokenIdentifier) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
        .unique();
      if (user?.file) {
        const url = await ctx.storage.getUrl(user.file as Id<"_storage">);
        if (url) {
          return { ...user, file: url };
        }
      }
      return user;
    }
  },
});

// This query returns the user's friends.
export const retrieveUserFriends = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const users = await ctx.db.query("user").collect();
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
      .unique();
    const friends = users.filter((u) => user?.friends?.includes(u._id));
    return Promise.all(
      friends.map(async (friend) => {
        if (friend.file) {
          const url = await ctx.storage.getUrl(friend.file as Id<"_storage">);
          if (url) {
            return { _id: friend._id, file: url };
          }
        }
        return { _id: friend._id };
      })
    );
  },
});

// This query retrieves a user from the database
export const retrieveById = query({
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
export const collect = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const { tokenIdentifier } = identity!;
    const users = await ctx.db
      .query("user")
      .filter((q) => q.neq(q.field("tokenIdentifier"), tokenIdentifier))
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
export const retrieveByIds = query({
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
