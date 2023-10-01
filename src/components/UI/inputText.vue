<template>
    <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
    export default {
        name: "inputText",
        props: {
            modelValue: [String, Number],
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        },
    }
</script>

<style lang="scss">
    input {
        border: 2px solid #005bff;
        padding: 6px 4px;
        border-radius: 6px;
    }
</style>