const { isFailure, failure, success, empty, payload } = require("./failable");
const { isUserAuthed, getUserData, isValidUser } = require("./api");

// ======================================
//
//               SECOND WAY
//
// ======================================

// need to implement these function
function verifyStep(user) {
  const errorMessage = "please supply a valid user";
  try {
    if (!isValidUser(user)) return failure(errorMessage)
  } catch (error) {
    return failure(errorMessage);
  }
  return success(user);
}
async function authStep(user) {
  const authed = await isUserAuthed(user);
  if (!authed) {
    return failure('user is not authed');
  }
  return success(user);
}
async function userDataStep(user) {
  const userData = await getUserData(user);
  if (userData.items) {
    return success(userData);
  }
  return failure(user.name + ' had no items');
}
async function balanceStep(userData) {
  console.log('userData:', userData)
  let total = 0;
  userData.items.forEach(i => {
    total += i.price;
  });
  return success(total);
}

// Notice we still need to think about async
async function getUserBalanceV2(user) {
  const s1 = verifyStep(user);
  if (isFailure(s1)) return s1;
  const s2 = await authStep(payload(s1));
  if (isFailure(s2)) return s2;
  const s3 = await userDataStep(payload(s2));
  if (isFailure(s3)) return s3;
  const s4 = await balanceStep(payload(s3));
  return s4;
}

// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV2,
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
};
