<template>
    <div class="search">
        <div class="modalMask" v-if="shownModal">
            <div class="modalContainer">
                <LoginModal v-if="typeModal == 'loginIn'" @closeModal="shownModal = false" @typeModal="typeModal = 'signUp'" />
                <SignUpModal v-if="typeModal == 'signUp'" @closeModal="shownModal = false, typeModal = 'loginIn'" @typeModal="typeModal = 'loginIn'" />
            </div>
        </div>
        <productList 
                     :products="filterProducts"
                     listType="search"
                     @shownModal="shownModal= true"
                     />
    </div>
</template>

<script>
    import productList from '@/components/ProductList.vue';
    import myButton from "@/components/UI/myButton.vue";
    import LoginModal from "@/components/LogInModal.vue"
    import SignUpModal from "@/components/SignUpModal.vue"
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            productList,
            myButton,
            LoginModal,
            SignUpModal,
        },
        data() {
            return {
                payload: [30, 1, this.$route.params.catalogId],
                searchText: '',
                catalogId: '',
                shownModal: false,
                typeModal: 'loginIn',
            }
        },
        methods: mapActions(['fetchProducts']),
        computed: {
            ...mapGetters(['allProducts']),
            filterProducts() {
                const catalogId = this.$route.params.catalogId;
                const searchText = this.$route.params.searchText;
                if (catalogId != 'all') {
                    let filterText = this.allProducts.filter(product => product.albumId == catalogId);
                    return filterText.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
                } else {
                    return this.allProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                }
            },
        },
        async mounted() {
            this.fetchProducts(this.payload);
        },
        watch: {
            '$route.params'() {
                this.fetchProducts([30, 1, this.$route.params.catalogId]);
            }
        }
    }
</script>

<style lang="scss">
    .modalMask {
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modalContainer {
        padding: 12px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        width: 324px;
        max-width: calc(100% - 18px);
    }
</style>