import bcrypt from "bcryptjs";

import { users } from "../data/data.js";
import User from "../models/user.model.js";

const userResolver = {
  Query: {
    authUser: async (_, args, context) => {
      try {
        const user = await context.getUser();
        console.log(user)
        return user;
      } catch (error) {
        console.error("Error in authUser: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_, args) => {
      try {
        const user = await User.findById(args.userId);
        return user;
      } catch (error) {
        console.error("Error in user query: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Mutation: {
    signUp: async (_, args, context) => {
      try {
        const { username, name, password, gender } = args.input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https:://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https:://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
          gender,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in signUp: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, args, context) => {
      try {
        const { username, password } = args.input;

        if (!username || !password) {
          throw new Error("All fields are required");
        }

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error in login: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, args, context) => {
      try {
        await context.logout();

        context.req.session.destroy((error) => {
          if (error) throw new Error(error.message || "Internal server error");
        });

        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in logout: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
