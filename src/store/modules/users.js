export default {
  actions: {
    async toLoginUser(ctx, logForm) {
      let name = "?name=" + logForm[0]; let password = "&username=" + logForm[1];
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"+name+password,
      );
      const users = await res.json();
      let logUser='';
      if (users != 0) {
        logUser = users[0];
        logUser.website = {
          id1 : { count : 1 }, 
          id12 : { count : 2 }, 
          id24 : { count : 1 },
          id75 : { count : 3 }
        }; // использую вместо cart
        logUser.company = [1, 10, 12, 48, 24, 50, 75]; // использую вместо favorite
      } else { logUser = 'notFound'; }
      ctx.commit('userLogin', logUser)
    },
  },
  mutations: {
    userLogin(state, user) {
      state.userLogin = user;
    }
  },
  state: {
    userLogin: [],
  },
  getters: {
    userLogin(state) {
      return state.userLogin
    }
  }
}