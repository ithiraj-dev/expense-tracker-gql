import { users } from "../data/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, args) => {
        return users.find((user) => user._id === args.userId);
    }
  },
  Mutation: {},
};

export default userResolver;
