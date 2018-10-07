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

        <quoteButton v-on:pressed="viewSettings()"
                     class="QuoteNavigation-button"
                     v-bind:text="'Settings'">
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
			},
			viewSettings: function () {
				this.$emit("goToSettings");
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteNavigation.scss";
</style>