<template>
    <div class="loginIn">
        <div id="XButton"><myButton @clickEvent="$emit('closeModal')">X</myButton></div>
        <h1>Login In</h1>
        <form class="loginForm" @submit.prevent="formUsers">
            <inputText v-model="name" placeholder="Enter Name" v-focus />
            <inputText type="password" v-model="password" placeholder="Enter Password" />
            <myButton>Login In</myButton>
        </form>
        <button id="switchModal" @click="$emit('typeModal')">Sign Up</button>
    </div>
</template>

<script>
    import inputText from "@/components/UI/inputText.vue";
    import myButton from "@/components/UI/myButton.vue";
    import { mapGetters, mapActions } from 'vuex';

    export default {
        directives: {
            focus: { mounted(el) { el.focus() } }
        },
        components: {
            inputText, myButton
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
            }
        },
        computed: mapGetters(['userLogin']),
        methods: {
            ...mapActions(['toLoginUser']),
            async formUsers() {
                const formLogin = [this.name, this.password];
                await this.toLoginUser(formLogin)
                if (this.userLogin != 0) {
                    this.$emit('closeModal');
                } else { console.log('ircorrect') }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loginIn {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
    }
    .loginForm {
        display: flex;
        flex-direction: column;
        & * {
            margin: 8px auto;
        }
    }
    h1 {
        font-size: 48px;
        margin: 0 auto 24px auto;
    }
    input {
        font-size: 18px;
    }
    button {
        padding: 4px 12px;
    }
    a {
        margin-top: 48px;
        font-size: 16px;
    }
    #XButton {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    #switchModal {
        background-color: #fff;
        font-size: 18px;
        &:hover {
            color: #005bff;
        }
    }
</style>