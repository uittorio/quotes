<template>
    <div class="QuoteNavigation">
        <quoteButton v-on:pressed="viewHome()"
                     class="QuoteNavigation-button"
                     v-bind:text="'Home'">
        </quoteButton>

        <quoteButton v-on:pressed="viewList()"
                     class="QuoteNavigation-button"
                     v-bind:text="'All quotes'">
        </quoteButton>
        <quoteButton v-on:pressed="viewForm()"
                     class="QuoteNavigation-button"
                     v-bind:text="'Add new Quote'">
        </quoteButton>
    </div>

</template>

<script lang="ts">
	import QuoteButton from "../button/button.vue";

	export default {
		components: {QuoteButton},
		methods: {
			viewHome: function () {
				this.$emit("goToHome");
			},
			viewList: function () {
				this.$emit("goToList");
			},
			viewForm: function () {
				this.$emit("goToForm");
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteNavigation.scss";
</style>