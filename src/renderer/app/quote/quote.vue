<template>
	<div class="Quote-container">
		<quoteButton v-on:pressed="goToList()"
					 class="App-buttonList"
					 v-bind:text="'All quotes'">
		</quoteButton>
		<div class="Quote-logoTopContainer">
			<img class="Quote-logo"
				 src="../../icons/quote.svg">
			<span class="Quote-title">{{quote.title}}</span>
		</div>
		<div class="Quote-textContainer" v-if="quote.id">
			<p class="Quote-text">{{quote.text}}</p>

			<p class="Quote-info" v-if="!quote.book">
				{{quote.author}}
			</p>

			<p class="Quote-info" v-if="quote.book">
				{{quote.author}} - {{quote.book}}
			</p>
		</div>
		<div class="Quote-logoContainerEnd">
			<img class="Quote-logo Quote-logoEnd"
				 src="../../icons/quote.svg">
		</div>

		<quoteButton v-on:pressed="goToForm()"
			class="App-buttonAdd"
			v-bind:text="'Add new Quote'">
		</quoteButton>
	</div>
</template>

<script lang="ts">
	import QuoteButton from "./../button/button";

	export default {
	  components: {QuoteButton},
	  props: ['quote'],
	  name: "Quote",
	  methods: {
	  	goToList: function() {
	  		this.$emit("goToList");
		},
		goToForm: function() {
			this.$emit("goToForm");
		}
	  }
  	}
</script>

<style lang="scss">
	@import "./quote.scss";
</style>
