export default {
  actions: {
    async fetchProducts(ctx, payload) {
      let limit = payload[0]; let page = payload[1]; let catalogId = payload[2];
      if (catalogId != undefined) {
        if (catalogId != 'all') { catalogId = "&albumId=" + catalogId; }
        else { catalogId = '' }
      }
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=150"+catalogId, //лимит что бы не грузились 5к фото
      );
      const products = await res.json();
      ctx.commit('updateProducts', products)
    },
    /* хотел сдеать "бесконечную ленту", но не смог решить проблему со совмещением старого и нового массивов (array и Proxy(Array))
    async loadMoreProducts(ctx, payload) {
      console.log("limit:", payload[0]," page: ", payload[1], " catalogId: ", payload[2]);
      let limit = payload[0]; let page = payload[1]; let catalogId = payload[2];
      if (catalogId != undefined) {
        if (catalogId != 'all') { catalogId = "&albumId=" + catalogId; }
        else { catalogId = '' }
      }
      let res = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=" + limit + "&_page=" + page + catalogId,
      );
      const products = await res.json();
      ctx.commit('updateMoreProducts', products)
    } */
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products
    },
    /* updateMoreProducts(state, products) {
      state.products = [state.products, products];
      console.log(state.)
    } */
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