import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDefs.js";

const typeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default typeDefs;
