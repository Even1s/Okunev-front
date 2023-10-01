<template>
    <div class="signUp">
        <div id="XButton"><myButton @clickEvent="$emit('closeModal')">X</myButton></div>
        <h1>Sign Up</h1>
        <form class="signUpForm" @submit.prevent="sendUser">
            <inputText v-model="name" placeholder="Enter Name" v-focus />
            <inputText v-model="email" placeholder="Enter Email" />
            <inputText type="password" v-model="password" placeholder="Enter Password" />
            <myButton>Sign Up</myButton>
        </form>
        <button id="switchModal" @click="$emit('typeModal')">Login In</button>
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
        methods: {
            async sendUser() {

                let data = {
                    name: this.name,
                    email: this.email,
                    username: this.password,
                    id: 11,
                };
                data = JSON.stringify(data);
                const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                    method: 'POST',
                    body: data,
                });
                //console.log(response);
                this.name='';this.email='';this.password='';this.$emit('typeModal');
                return await response; //запрос на добавление аккаунта проходит, но из-за специфики JSONplaseholder данные не изменяются
            }
        },
    }
</script>

<style lang="scss" scoped>
    .signUp {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
    }

    .signUpForm {
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