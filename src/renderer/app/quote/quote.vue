<template>
	<div class="Quote-container">
		<div class="Quote-logoTopContainer">
			<img class="Quote-logo"
				 src="../../icons/quote.svg">
			<span class="Quote-title">{{quote.title}}</span>
		</div>
		<div class="Quote-textContainer" v-if="quote.id">
			<p class="Quote-text">{{quote.text}}</p>

			<p class="Quote-info" v-if="quote.author && quote.book">
				{{quote.author}} - {{quote.book}}
			</p>
		</div>
		<div class="Quote-logoContainerEnd">
			<img class="Quote-logo Quote-logoEnd"
				 src="../../icons/quote.svg">
		</div>
	</div>
</template>

<script lang="ts">
	export default {
	  props: ['quote'],
	  name: "Quote"
  	}
</script>

<style>
	@import "./quote.scss";
</style>
