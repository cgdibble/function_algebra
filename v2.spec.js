const equal = require("assert").deepEqual;
const { userDB } = require("./api");
const {
  getUserBalanceV2,
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
} = require("./v2");
const { isFailure, isSuccess, payload } = require("./failable");

// ======================================
//
//        SECOND WAY getUserBalanceV2
//
// ======================================

test("should not be a valid user", async () => {
  const result = verifyStep(null);
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test("should be a valid user", async () => {
  const user = { name: "bob" };
  const result = verifyStep(user);
  equal(isSuccess(result), true);
  equal(payload(result), user);
});

test("should not be a authed user", async () => {
  const user = { name: "bob" };
  const result = await authStep(user);
  equal(isFailure(result), true);
  equal(payload(result), "user is not authed");
});

test("should be a authed user", async () => {
  const user = { name: "tim" };
  const result = await authStep(user);
  equal(isSuccess(result), true);
  equal(payload(result), user);
});

test("should return user data for carl", async () => {
  const user = { name: "carl" };
  const result = await userDataStep(user);
  equal(isSuccess(result), true);
  equal(payload(result), userDB["carl"]);
});

test("should return price balance for carl", async () => {
  const userData = userDB["carl"];
  const result = await balanceStep(userData);
  equal(isSuccess(result), true);
  equal(payload(result), 60);
});

test("should NOT go boom!", async () => {
  const result = await getUserBalanceV2(null);
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test("should return not a valid user", async () => {
  const result = await getUserBalanceV2({ foo: "bar" });
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test("should return user not authenticated", async () => {
  const result = await getUserBalanceV2({ name: "jack" });
  equal(isFailure(result), true);
  equal(payload(result), "user is not authed");
});

test("should return user had no items", async () => {
  const result = await getUserBalanceV2({ name: "tim" });
  equal(isFailure(result), true);
  equal(payload(result), "tim had no items");
});

test("should return 60", async () => {
  const result = await getUserBalanceV2({ name: "carl" });
  equal(isSuccess(result), true);
  equal(payload(result), 60);
});
