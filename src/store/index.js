import { createStore } from 'vuex'
import products from './modules/products'
import users from './modules/users'
import updateProduct from './modules/updateProduct'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    users,
  }
})
