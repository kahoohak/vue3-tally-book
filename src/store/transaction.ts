import { defineStore } from "pinia";
import { reactive, computed } from "vue";

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
  const removeTransaction = (id: number) => {
    const index = transactions.findIndex((transaction) => transaction.id === id);
    if (index !== -1) {
      transactions.splice(index, 1);
    }
  };

  // 实现计算总余额
  const totalAmount = computed(() => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0) || 0;
  });

  // 实现计算总收入
  const totalIncome = computed(() => {
    return transactions.filter(transaction => transaction.type === 'plus').reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);
  });

  // 实现计算总支出
  const totalExpense = computed(() => {
    return transactions.filter(transaction => transaction.type === 'minus').reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);
  });

  return {
    transactions,
    addTransaction,
    removeTransaction,
    totalAmount,
    totalIncome,
    totalExpense,
  };
});
