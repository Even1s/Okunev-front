<template>
    <div class="productList" v-if="listType == 'standart' && products.length > 0">
        <div class="productFlex">
            <ProductsItem v-for="product in products"
                          :product="product"
                          :key="product.id" />
        </div>
    </div>
    <div class="productList" v-else-if="listType == 'search' && products.length > 0">
        <div class="productSearch">
            <TransitionGroup name="productListGroup">
                <ProductItemSearch v-for="product in products"
                                   :product="product"
                                   :key="product.id"
                                   @shownModal="$emit('shownModal')"/>
            </TransitionGroup>
        </div>
    </div>
    <h2 v-else class="noMoreProducts">
        No More Products
    </h2>
    <!--<div style="height: 5px; background-color: green" class="observer" ref="observer" />-->
</template>

<script>
    import ProductsItem from "@/components/ProductsItem.vue";
    import ProductItemSearch from "@/components/ProductItemSearch.vue";

    export default {
        components: { ProductsItem, ProductItemSearch,  },
        props: {
            products: {
                require: true
            },
            listType: {
                type: String,
                require: true
            }
        }, /*
        mounted() {
            var options = {
                rootMargin: "0px",
                threshold: 1.0,
            };
            var callback = (entries, observer) => {
                if (entries[0].isIntersecting) {
                    this.payload[1]++; this.payload.push(this.products);
                    this.loadMoreProducts(this.payload);
                }
            };
            var observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
        }, */
    }

</script>

<style lang="scss" scoped>
    .title {
        font-size: 32px;
        text-align: center;
        margin-top: 12px;
    }
    .productFlex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .productListGroup-enter-active,
    .productListGroup-leave-active {
        transition: all .15s ease;
    }
    .productListGroup-enter-from,
    .productListGroup-leave-to {
        opacity: 0;
        transform: translateX(15px);
    }
    .noMoreProducts {
        font-size: 36px;
        margin: 16px 0;
        text-align: center;
        color: red;
        height: 91vh;
    }
</style>