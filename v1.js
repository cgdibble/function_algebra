const { isUserAuthed, getUserData, isValidUser } = require("./api");

// ======================================
//
//      FIRST WAY (Coordination functions)
//
// ======================================

// getUserBalanceV1:: user -> Promise -> Error | String | Number
async function getUserBalanceV1(user) {
  if (isValidUser(user)) {
    // try inside of if... we have multiple code paths
    try {
      // remember to think about async (dont forget the await)
      // even with tests I have ended up with working code
      // because I was not depending on the result of the async
      // operation
      const authed = await isUserAuthed(user);

      // notice that isUserAuthed and getUserData
      // return different types and I have to think
      // about (wire up) each one in a different way
      if (!authed) return "not logged in";
      const userData = await getUserData(user);

      // imperative logic in the coordiation function
      // bad... very bad
      let total = 0;
      userData.items.forEach(i => {
        total += i.price;
      });

      // sometimes this function returns a string
      // sometimes it throws an error
      // sometimes it returns a number
      // always inside of a promise
      return total;
    } catch (e) {
      // here is that second code path
      return e.toString();
    }
  }
  return "not a valid user";
}

// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV1
};
