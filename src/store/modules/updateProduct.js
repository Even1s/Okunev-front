export default {
  actions: {
    async loadMoreProducts(ctx, payload) {
      let limit = payload[0]; let page = payload[1]; let catalogId = payload[2];
      if (catalogId != undefined) {
        if (catalogId != 'all') { catalogId = "&albumId=" + catalogId; }
        else { catalogId = '' }
      }
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=" + limit + "&_page=" + page + catalogId,
      );
      let products = [products, await res.json()];
      ctx.commit('updateProducts', products)
    }
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products
    }
  },
  state: {
    products: [],
  },
  getters: {
    allProducts(state) {
      return state.products
    }
  },
}