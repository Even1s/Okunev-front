<template>
    <div class="home">
        <productList :products="allProducts" listType="standart"/>
    </div>
</template>

<script>
    import productList from '@/components/ProductList.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: mapGetters(['allProducts']),
        data() {
            return {
                payload: [30, 1, "all"],
            }
        },
        methods: {
            ...mapActions(['fetchProducts','loadMoreProducts']),
        },
        /* updated() {
            this.payload[1]++; this.payload.push(this.allProducts);
            console.log(this.payload[1]);
        }, */
        async mounted() {
            this.fetchProducts(this.payload);
            // this.loadMoreProducts(this.payload);
        },
        components: {
            productList,
        },
    }
</script>