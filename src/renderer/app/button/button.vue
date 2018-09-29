<template>
    <div>
        <button class="Button-button"
                v-on:click="pressed()">{{text}}</button>
    </div>
</template>

<script lang="ts">
	export default {
		name: "QuoteButton",
        props: ['text'],
        methods: {
            pressed: function() {
				this.$emit("pressed")
            }
      }
	}
</script>

<style lang="scss">
    @import "./button.scss";
</style>
