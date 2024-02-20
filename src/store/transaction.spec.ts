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
      expect(store.transactions[0]).toEqual(transaction)
    });

    it("should add a positive transaction", () => {
      const store = useTransaction();
      const transaction = store.addTransaction("Test", -50);

      expect(transaction).toEqual(expect.objectContaining({ title: "Test", amount: -50, type: "minus" }));
      expect(store.transactions[0]).toEqual(transaction)
    });
  });
});
