const equal = require("assert").deepEqual;
const { getUserBalanceV3 } = require("./v3");
const { isFailure, isSuccess, payload } = require("./failable");

// ======================================
//
//       THIRD WAY getUserBalanceV3
//
// ======================================

test("should NOT go boom!", async () => {
  const result = await getUserBalanceV3(null);
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test("should not be a valid user", async () => {
  const result = await getUserBalanceV3({ foo: "bar" });
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test.only("should return user had no items", async () => {
  const result = await getUserBalanceV3({ name: "tim" });
  equal(isFailure(result), true);
  equal(payload(result), "tim had no items");
});

test.skip("should return 60", async () => {
  const result = await getUserBalanceV3({ name: "carl" });
  equal(isSuccess(result), true);
  equal(payload(result), 60);
});
