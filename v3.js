const { isFailure, success, payload } = require("./failable");
const { isUserAuthed, getUserData, isValidUser } = require("./api");
const {
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
} = require("./v2");
// ======================================
//
//               THIRD WAY
//
// ======================================

const makePromise = async (fn, val) => {
  return fn(val)
}

// need to implement this function
const pipeline = steps => async (input) => {
  // const first = steps[0](input)
  // if (isFailure(first)) return first
  // console.log('first:', first)
  // const second = await makePromise(steps[1], input)
  // console.log('second:', second)
  // if (isFailure(second)) return second
  //
  // const third = await makePromise(steps[2], input)
  // if (isFailure(third)) return third
  // console.log('third:', third)
  let lastOuput = input
  const promises = steps.forEach( async (fn, i) => {
    const result = await makePromise(fn, lastOuput)
    console.log('I::::', i)
    if(isFailure(result)) return Promise.resolve(result)
    lastOuput = payload(result)
    console.log('input:', input)
    return result
  })
  // const promises = steps.map(async (fn, i) => {
  // })
  console.log(':::::::::::::::::')
  return Promise.resolve(success())

}

const getUserBalanceV3 = (user) => {
  return pipeline([
    verifyStep,
    authStep,
    userDataStep,
    balanceStep
  ])(user)
}

// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV3
};
