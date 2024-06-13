import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, args, context) => {
      try {
        if(!context.getUser()) throw new Error("Unauthorized")
        
        const userId = context.getUser()._id;

        const transactions = await Transaction.find({ userId });

        return transactions;
      } catch (error) {
        console.error("Error getting transactions: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, args) => {
      try {
        const transaction = await Transaction.findById(args.transactionId);
        return transaction;
      } catch (error) {
        console.error("Error getting transaction: ", error);
        throw new Error(error.message || "Internal server error");
      }
    }
  },
  Mutation: {
    createTransaction: async (_, args, context) => {
      try {
        const newTransaction = new Transaction({
          ...args.input,
          userId: context.getUser()._id,
        })

        await newTransaction.save();

        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    updateTransaction: async (_, args) => {
      try {
        const updatedTransaction = Transaction.findByIdAndUpdate(args.input.transactionId, input, {new: true});

        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    deleteTransaction: async (_, args) => {
      try {
        const deletedTransaction = Transaction.findByIdAndDelete(args.transactionId);

        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw new Error(error.message || "Internal server error");
      }
    }
  },
};

export default transactionResolver;
