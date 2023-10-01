<template>
    <form class="productSearch" @submit.prevent="formSearch">
        <div class="searchInput">
            <select v-model="catalogId">
                <option value="all">Everywhere</option>
                <option value="1">1st category</option>
                <option value="2">2nd category</option>
                <option value="3">3rd category</option>
            </select>
            <inputText v-model="searchText"
                       placeholder="Search...."
                       v-focus />
        </div>
        <myButton><img src="@/assets/search.svg" /></myButton>
    </form>
</template>

<script>
    import inputText from "@/components/UI/inputText.vue";
    import myButton from "@/components/UI/myButton.vue";
    import { mapGetters, mapActions } from 'vuex';
    var i = 0;

    export default {
        props: {
            standartText: {
                type: String
            },
            standartId: {
                type: String
            }
        },
        components: {
            inputText, myButton
        },
        data() {
            return {
                catalogId: 'all',
                searchText: '',
            }
        },
        directives: {
            focus: { mounted(el) { el.focus() } }
        },
        methods: {
            ...mapActions(['fetchProducts']),
            async formSearch() {
                this.$router.push('/search/' + this.catalogId + '/' + this.searchText);
                window.scrollTo(0, 0);
                this.payload = [30, 1, this.$route.params.catalogId];
                this.fetchProducts(this.payload);
            },
        },
        updated() {
            if (i == 0 && this.standartId) { this.searchText = this.standartText; this.catalogId = this.standartId; i++; }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        width: calc(100% - 480px);
    }
    input {
        border-left: none;
        border-radius: 0;
        width: calc(100% - 127px);
    }
    select {
        border: 2px solid #005bff;
        padding: 6px 8px;
        border-right: none;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    select, input, button {
        height: 54px;
        font-size: 15px;
    }
    .searchInput {
        width: 100%;
    }
    button {
        width: 50px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>