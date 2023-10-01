<template>
    <div class="productItem">
        <router-link :to="{name: 'product', params: { productId: product.id }}" class="mainImg">
            <img :src="product.thumbnailUrl" class="mainImg" />
        </router-link>
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <p class="productName">{{ product.title }}</p>
        </router-link>
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <div class="price">PRICE</div>
        </router-link>
        <!--<div class="price">{{ product.price }}</div>-->
        <router-link :to="{name: 'product', params: { productId: product.id }}">
            <div class="rating">
                <img src="@/assets/star-rate-gold.svg" /> RATING
                <img src="@/assets/comment.svg" /> COMMENTS
            </div>
        </router-link>
        <div class="action">
            <myButton v-if="inCart!=true" @clickEvent="switchCart(true)">
                <img src="@/assets/cart.svg" />
            </myButton>
            <myButton v-else-if="inCart" @clickEvent="switchCart(false)" style="background-color: #10c44c;">
                <img src="@/assets/cart.svg" />
            </myButton>
            <myButton v-if="inFavorite!=true" @clickEvent="switchFavorite(true)">
                <img src="@/assets/favorite.svg" />
            </myButton>
            <myButton v-else-if="inFavorite" @clickEvent="switchFavorite(false)" style="background-color: #10c44c">
                <img src="@/assets/favorite.svg" />
            </myButton>
        </div>
    </div>
</template>

<script>
    import myButton from "@/components/UI/myButton.vue";
    import { mapGetters } from 'vuex';

    export default {
        computed: mapGetters(['userLogin']),
        components: {
            myButton,
        },
        props: {
            product: {
                type: Object,
                require: true
            },
        },
        data() {
            return {
                inCart: false,
                inFavorite: false,
            }
        },
        methods: {
            async switchCart(typeSwitch) {
                if (this.userLogin == 0) { this.$emit('shownModal') } else {
                this.inCart = typeSwitch;
                if (typeSwitch) { this.userLogin.website['id'+this.product.id] = { count: 1};
                } else { delete(this.userLogin.website['id'+this.product.id]); }
                let cartData = JSON.stringify(this.userLogin.website);
                const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + this.product.id, {
                    method: 'PATCH',
                    body: cartData,
                });
                return await response;
                }
            },
            async switchFavorite(typeSwitch) {
                if (this.userLogin == 0) { this.$emit('shownModal') } else {
                this.inFavorite = typeSwitch;
                if (typeSwitch) { this.userLogin.company.push(this.product.id);
                } else { this.userLogin.company.splice(this.userLogin.company.indexOf(this.product.id), 1); }

                let favorData = JSON.stringify(this.userLogin.company);
                const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + this.product.id, {
                    method: 'PATCH',
                    body: favorData,
                });
                return await response;
                }
            }
        },
        async mounted() {
            if (this.userLogin != 0) {
                if (this.userLogin.website['id' + this.product.id]) { this.inCart = true; }
                if (this.userLogin.company.indexOf(this.product.id) != -1) { this.inFavorite = true; }
            }
        },
        watch: {
            userLogin() {
                if (this.userLogin.website['id' + this.product.id]) { this.inCart = true; }
                if (this.userLogin.company.indexOf(this.product.id) != -1) { this.inFavorite = true; }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .productItem {
        border-bottom: 1px solid #ccc;
        margin: 12px 8px;
        font-size: 24px;
        color: #2c3e50;
        display: grid;
        grid-template-columns: 210px auto 180px;
        grid-template-rows: 180px 50px;
    }

    .mainImg {
        width: 100%;
        border-radius: 8px;
        grid-row: span 2;
    }

    .productName {
        margin: 16px 12px;
    }

    .price {
        height: 20px;
        color: #F81155;
        margin-top: 16px;
        text-align: center;
    }
    .rating {
        img {
            margin-left: 8px;
        }
    }
    .action {
        display: flex;
        justify-content: space-evenly;
        padding: 0 6px 12px 6px;

        button:nth-child(1) {
            width: 80px;
        }

        button:nth-child(2) {
            width: 60px;
        }
    }
</style>
