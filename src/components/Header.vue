<template>
    <header :class="{locked: shownModal}">
        <router-link to="/" class="logo"><img src="/okunev_trade.svg" alt="NO" />Okun.trade</router-link>
        <ProductSearch :standartText="this.$route.params.searchText" :standartId="this.$route.params.catalogId" />
        <div class="links">
            <myButton v-if="this.userLogin==0" @clickEvent="shownModal = true">
                <img src="@/assets/login.svg" />
                Login In
            </myButton>
            <router-link v-else to="/account">
                <img src="@/assets/person.svg" />
                Account
            </router-link>
            <router-link to="/favorite">
                <img src="@/assets/favorite.svg" />
                Favorite
            </router-link>
            <router-link to="/cart">
                <img src="@/assets/cart.svg" />
                Cart
            </router-link>
            <router-link to="/order">
                <img src="@/assets/package.svg" />
                Order
            </router-link>
        </div>
        <div class="modalMask" v-if="shownModal">
            <div class="modalContainer">
                <LoginModal v-if="typeModal == 'loginIn'" @closeModal="shownModal = false" @typeModal="typeModal = 'signUp'" />
                <SignUpModal v-if="typeModal == 'signUp'" @closeModal="shownModal = false, typeModal = 'loginIn'" @typeModal="typeModal = 'loginIn'" />
            </div>
        </div>
    </header>
</template>

<script>
    import ProductSearch from "@/components/ProductSearch.vue";
    import myButton from "@/components/UI/myButton.vue";
    import LoginModal from "@/components/LogInModal.vue"
    import SignUpModal from "@/components/SignUpModal.vue"
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                shownModal: false,
                typeModal: 'loginIn',
            }
        },
        computed: mapGetters(['userLogin']),
        components: {
            ProductSearch,
            myButton,
            LoginModal,
            SignUpModal,
        },
    }
</script>

<style lang="scss" scoped>
    header {
        position: fixed;
        border-bottom: solid 2px #005bff;
        background-color: #fff;
        width: 100%;
        padding: 6px 8px 8px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input {
        width: calc(100% - 560px);
        margin: 0;
        padding: 4px;
        font-size: 20px;
    }
    .links {
        display: flex;

        a, button {
            margin-right: 6px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4px;
            width: 55px;
        }

        img {
            width: 32px;
        }
    }
    .logo {
        font-size: 30px;
        color: #2b9bff;

        a.router-link-exact-active {
            color: #1871c0;
        }
    }
    a {
        font-size: 20px;
        font-weight: bold;
        color: #2c3e50;

        img {
            width: 30px;
        }

        &:hover {
            color: #2b5177;
        }
    }
</style>