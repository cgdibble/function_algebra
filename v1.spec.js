const equal = require("assert").deepEqual;
const { getUserBalanceV1 } = require("./v1");

// ======================================
//
//      FIRST WAY getUserBalanceV1
//
// ======================================

test("should go boom!", async () => {
  try {
    const result = await getUserBalanceV1(null);
  } catch (e) {
    equal(e.toString(), "TypeError: Cannot read property 'name' of null");
  }
});

test("should return not a valid user", async () => {
  const result = await getUserBalanceV1({ foo: "bar" });
  equal(result, "not a valid user");
});

test("should give a TypeError with no items", async () => {
  const result = await getUserBalanceV1({ name: "tim" });
  equal(result, "TypeError: Cannot read property 'forEach' of undefined");
});

test("should return the balance", async () => {
  const result = await getUserBalanceV1({ name: "carl" });
  equal(result, 60);
});
