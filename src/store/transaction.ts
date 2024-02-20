import { defineStore } from "pinia";
import { reactive } from "vue";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "plus" | "minus";
}

let id = 0;

export const useTransaction = defineStore("transaction", () => {
  const transactions = reactive<Transaction[]>([]);

  // 实现添加transaction的函数
  const addTransaction = (title: string, amount: number) => {
    const transaction: Transaction = {
      id: ++id,
      title,
      amount,
      type: amount > 0 ? "plus" : "minus",
    };
    transactions.push(transaction);

    return transaction;
  };

  // 实现删除transaction的函数
  const deleteTransaction = (id: number) => {
    const index = transactions.findIndex((transaction) => transaction.id === id);
    if (index !== -1) {
      transactions.splice(index, 1);
    }
  }

  return {
    transactions,
    addTransaction,
  };
});
