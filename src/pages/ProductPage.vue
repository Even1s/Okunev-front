<template>
    <div class="product">
        <div class="modalMask" v-if="shownModal">
            <div class="modalContainer">
                <LoginModal v-if="typeModal == 'loginIn'" @closeModal="shownModal = false" @typeModal="typeModal = 'signUp'" />
                <SignUpModal v-if="typeModal == 'signUp'" @closeModal="shownModal = false, typeModal = 'loginIn'" @typeModal="typeModal = 'loginIn'" />
            </div>
        </div>
        <div class="productTitle">
            <h1>{{ product.title }}</h1>
            <div class="rating">
                <img src="@/assets/star-rate-gold.svg" />
                <h3>
                    RATING
                </h3>
                <img src="@/assets/comment.svg" />
                <h3>
                    COMMENTS
                </h3>
                <h3>| id: {{ product.id }}</h3>
            </div>
        </div>
        <div class="productBody">
            <div class="productImg">
                <img :src="product.url" />
            </div>
            <div class="description">
                <div class="deskrBlock">
                    <h2>Category:</h2>
                    <p>{{ product.albumId }}</p>
                </div>
                <div class="deskrBlock">
                    <h2>
                        Consectetur adipiscing elit fusce vel:
                    </h2>
                    <p>
                        Fusce vel sapien elit in malesuada semper mi
                    </p>
                </div>
                <div class="deskrBlock">
                    <h2>
                        Dolor sit:
                    </h2>
                    <p>
                        Fusce vel sapien elit in malesuada semper mi
                    </p>
                </div>
                <div class="deskrBlock">
                    <h2>
                        Sit amet, consectetur.:
                    </h2>
                    <p>
                        Dolor sit
                    </p>
                </div>
            </div>
            <div class="action">
                <h2 class="price">PRICE</h2>
                <myButton v-if="inCart!=true" @clickEvent="switchCart(true)">
                    Add to cart
                    <img src="@/assets/cart.svg" />
                </myButton>
                <div class="countInCart" v-else-if="inCart">
                    <myButton @clickEvent="switchCart(false)" style="background-color: #10c44c; width: 200px">
                        In the cart
                        <img src="@/assets/cart.svg" />
                    </myButton>
                    <myButton @clickEvent="countCart(true)" class="counter">
                        +
                    </myButton>
                    <h2>
                        {{ userLogin.website['id'+this.productId].count }}
                    </h2>
                    <myButton @clickEvent="countCart(false)" class="counter">
                        -
                    </myButton>
                </div>
                <myButton v-if="inFavorite!=true" @clickEvent="switchFavorite(true)">
                    To favorites
                    <img src="@/assets/favorite.svg" />
                </myButton>
                <myButton v-else-if="inFavorite" @clickEvent="switchFavorite(false)" style="background-color: #10c44c">
                    In favorites
                    <img src="@/assets/favorite.svg" />
                </myButton>
                <p>Delivery in N days</p>
            </div>
        </div>
    </div>
</template>

<script>
    import myButton from "@/components/UI/myButton.vue";
    import LoginModal from "@/components/LogInModal.vue"
    import SignUpModal from "@/components/SignUpModal.vue"
    import { mapGetters } from 'vuex';

    export default {
        computed: mapGetters(['userLogin']),
        components: {
            myButton,
            LoginModal,
            SignUpModal,
        },
        data() {
            return {
                productId: this.$route.params.productId,
                product: [],
                inCart: false,
                inFavorite: false,
                shownModal: false,
                typeModal: 'loginIn',
            }
        },
        methods: {
            async getPost() {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/photos/" + this.productId,
                );
                this.product = await res.json();
            },
            async switchCart(typeSwitch) {
                if(this.userLogin == 0) { this.shownModal = true } else {
                this.inCart = typeSwitch;
                if (typeSwitch) { this.userLogin.website['id'+this.productId] = { count: 1};
                } else { delete(this.userLogin.website['id'+this.productId]); }
                this.cartData();
                }
            },
            async countCart(countSwitch) {
                if(countSwitch) { this.userLogin.website['id'+this.productId].count++;
                } else if(this.userLogin.website['id'+this.productId].count>=2) { this.userLogin.website['id'+this.productId].count--;
                } else {
                    this.inCart = false;
                    delete(this.userLogin.website['id'+this.productId]);
                }
                this.cartData();
            },
            async cartData() {
                let cartData = JSON.stringify(this.userLogin.website);
                const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + this.productId, {
                    method: 'PATCH',
                    body: cartData,
                });
                return await response;
            },
            async switchFavorite(typeSwitch) {
                if(this.userLogin == 0) { this.shownModal = true } else {
                this.inFavorite = typeSwitch;
                if (typeSwitch) { this.userLogin.company.push(this.product.id);
                } else { this.userLogin.company.splice(this.userLogin.company.indexOf(this.product.id), 1); }

                let favorData = JSON.stringify(this.userLogin.company);
                const response = await fetch("https://jsonplaceholder.typicode.com/photos/" + this.productId, {
                    method: 'PATCH',
                    body: favorData,
                });
                return await response;
                }
            }
        },
        async mounted() {
            await this.getPost()
            if (this.userLogin != 0) {
                if (this.userLogin.website['id'+this.productId]) { this.inCart = true; }
                if (this.userLogin.company.indexOf(this.product.id) != -1) { this.inFavorite = true; }
            }
        },
        watch: {
            'userLogin.website'() {
                if (this.userLogin.website['id'+this.productId]) { this.inCart = true; }
                if (this.userLogin.company.indexOf(this.product.id) != -1) { this.inFavorite = true; }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .product {
        font-size: 24px;
        color: #2c3e50;
        padding-left: 16px;
        padding-right: 8px;
    }
    .productBody {
        height: 520px;
        display: grid;
        grid-template-columns: 1fr 1fr 340px;
    }

    .productTitle {
        margin: 16px 0;
        h1 {
            font-size: 38px;
        }
    }

    .price {
        color: #F81155;
        margin-top: 16px;
    }

    .rating {
        margin-top: 4px;
        font-size: 20px;
        img {
            width: 20px;
        }
        img:nth-child(2) {
            margin-left: 8px;
        }
        h3 {
            font-weight: 500;
            display: inline-block;
            margin-right: 6px;
        }
    }

    .action {
        padding: 0 6px 12px 6px;
        border-radius: 16px;
        box-shadow: 0 4px 14px 1px rgba(0, 0, 0, 0.3);
        display: grid;
        justify-items: center;
        grid-template-rows: 90px 80px 100px 30px;
        height: 300px;
        align-self: center;

        button {
            height: 60px;
            width: 100%;
            font-size: 30px;

            img {
                width: 36px;
            }
        }

        p {
            font-size: 14px;
        }
    }
    .countInCart {
        width: 100%;
        display: grid;
        grid-template-columns: 210px 1fr 1fr 1fr;
        padding-bottom: 20px;
        h2 {
            text-align: center;
            align-self: center;
            font-size: 26px;
        }
    }
    .productImg {
        max-width: 100%;
        max-height: 500px;
        display: flex;
        align-items: center;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .description {
        padding: 8px 12px;

        p {
            margin-left: 2px;
        }

        .deskrBlock {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            margin-top: 4px;
        }

        h2 {
            overflow-x: clip;

            &::after {
                content: '';
                display: inline-block;
                width: 100%;
                margin: 0 -99% 0 3px;
                vertical-align: baseline;
                border-bottom: 1px dashed #888;
            }
        }

        * {
            align-items: end;
            font-size: 18px;
        }
    }
</style>