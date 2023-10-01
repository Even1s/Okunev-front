<template>
    <headerBlock />

    <router-view />

    <footer>
        <ul>
            <li>Contacts:</li>
            <li>
                <a href="https://vk.com/even1s" target="_blank"><img style="max-height: 28px;" src="@/assets/vk-svg.svg"></a>
                <a href="https://t.me/even1s" target="_blank"><img style="max-height: 28px;" src="@/assets/telegram-svg.svg"></a>
                <a href="mailto:eockunev@yandex.ru" target="_blank"><img style="max-height: 28px;" src="@/assets/email-svg.svg"></a>
            </li>
        </ul>
    </footer>
</template>

<script>
    import headerBlock from '@/components/Header.vue'

    export default {
        components: {
            headerBlock
        }
    }
</script>


<style lang="scss">
    *{padding: 0;margin: 0;border: 0;}
    *,*:before,*:after{box-sizing: border-box;scroll-margin-top: 64px}
    :focus,:active{outline: none}
    a:focus,a:active{outline: none}
    nav,footer,header,aside{display: block}
    html,body{height: 100%;width: 100%;font-size: 100%;line-height: 1;font-size: 14px;}
    input,button,textarea{font-family: inherit}
    input::-ms-clear{display: none}
    button::-moz-focus-inner{padding: 0;border: 0}
    a,a:visited{text-decoration: none;color: #2c3e50;}
    a:hover{text-decoration: none;color: #005bff;}
    ul li{list-style: none}
    img{vertical-align: top}
    body:has(#app) { &:has(.locked) { overflow: hidden; } }

    #app {
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

        & > *:nth-child(2) {
            padding-top: 70px;
            min-height: 100vh;
            max-width: 1400px;
            margin: auto;
        }
    }

    footer {
        bottom: 0;
        font-size: 24px;
        color: #2f8a61;
        font-weight: 500;
        li img { margin: 0 4px; }
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: #ccc;
        width: 100%;
        padding: 12px 8px 8px 6px;
    }
</style>
