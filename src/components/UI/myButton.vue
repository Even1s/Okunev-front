<template>
    <button class="myButton" @click="$emit('clickEvent')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    button {
        background-color: #005bff;
        border-radius: 6px;
        font-size: 24px;
    }
</style>