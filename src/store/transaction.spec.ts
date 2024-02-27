import { beforeEach, it, expect, describe } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTransaction } from "./transaction";

describe("use transaction", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("addTransaction", () => {
    it("should add a new transaction", () => {
      const store = useTransaction();
      const transaction = store.addTransaction("Test", 100);

      expect(transaction).toEqual(expect.objectContaining({ title: "Test", amount: 100, type: "plus" }));
      expect(store.transactions[0]).toEqual(transaction);
    });

    it("should add a positive transaction", () => {
      const store = useTransaction();
      const transaction = store.addTransaction("Test", -50);

      expect(transaction).toEqual(expect.objectContaining({ title: "Test", amount: -50, type: "minus" }));
      expect(store.transactions[0]).toEqual(transaction);
    });
  });

  describe("removeTransaction", () => {
    it("should remove a transaction by its id", () => {
      const store = useTransaction();
      const transaction = store.addTransaction("Test", -50);
      store.removeTransaction(transaction.id);
      expect(store.transactions.length).toBe(0);
    });

    it("should not remove a transaction if it doesn't exist", () => {
      const store = useTransaction();
      const transaction = store.addTransaction("Test", -50);
      store.removeTransaction(100);
      expect(store.transactions.length).toBe(1);
    });
  });

  it("totalAmount should return the sum of positive transactions amounts", () => {
    const store = useTransaction();
    store.addTransaction("Test1", -50);
    store.addTransaction("Test2", 100);
    expect(store.totalAmount).toBe(50);
  });

  it("income", () => {
    const store = useTransaction();
    store.addTransaction("Test1", 100);
    store.addTransaction("Test1", -99);
    store.addTransaction("Test2", 100);
    expect(store.totalIncome).toBe(200);
  });

  it("expense", () => {
    const store = useTransaction();
    store.addTransaction("Test1", -100);
    store.addTransaction("Test1", 99);
    store.addTransaction("Test2", -100);
    expect(store.totalExpense).toBe(-200);
  });
});
