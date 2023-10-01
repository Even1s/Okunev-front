<template>
    <div class="productItem">
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <img :src="product.thumbnailUrl" />
        </router-link>
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <div class="price">PRICE</div>
        </router-link>
        <!--<div class="price">{{ product.price }}</div>-->
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <div class="rating">
                <img src="@/assets/star-rate-gold.svg" />5.0
                <img src="@/assets/comment.svg" />142
            </div>
        </router-link>
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <p>{{ product.title }}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .productItem {
        border-radius: 6px;
        margin: 12px 8px;
        height: 270px;
        width: 210px;
        font-size: 18px;
        -webkit-line-clamp: 4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    img {
        width: 100%;
        border-radius: 8px;
    }
    .price {
        height: 18px;
        color: #F81155;
        display: inline-block;
        margin-top: 4px;
        float: left;
    }
    .rating {
        margin-top: 4px;
        font-size: 18px;

        img {
            width: 18px;
            margin-left: 8px;
        }
    }
    p {
        clear: both;
    }
</style>
