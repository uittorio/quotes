<template>
	<div class="Quote-container">
		<div class="Quote-logoTopContainer">
			<img class="Quote-logo"
				 src="../icons/quote.svg">
			<span class="Quote-title">{{quote.title}}</span>
		</div>
		<div class="Quote-textContainer" v-if="quote.id">
			<p class="Quote-text">
				{{quote.text}}
			</p>

			<p class="Quote-info">
				{{quote.author}} - {{quote.book}}
			</p>
		</div>
		<div class="Quote-logoContainerEnd">
			<img class="Quote-logo Quote-logoEnd"
				 src="../icons/quote.svg">
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
	@font-face {
		font-family: "OpenSans-bold";
		src: url("../fonts/OpenSans-bold.ttf");
	}

	@font-face {
		font-family: "OpenSans-semibold";
		src: url("../fonts/OpenSans-SemiBold.ttf");
	}

	@font-face {
		font-family: "OpenSans-lightitalic";
		src: url("../fonts/OpenSans-LightItalic.ttf");
	}

	img {
		width: 100px;
		height: 100px;
	}

	.Quote-container {
		padding: 30px;
	}

	.Quote-logo {
		width: 100px;
		height: 100px;
	}

	.Quote-logoContainerEnd {
		display: flex;
	}

	.Quote-logoContainerEnd img {
		margin: 0 0 0 auto;
		transform: rotate(180deg);
	}

	.Quote-title {
		font-family: "OpenSans-semibold", serif;
		font-size: 40px;
		margin: 0 0 0 auto;
	}

	.Quote-logoTopContainer {
		display: flex;
		align-items: center;
	}

	.Quote-text {
		font-family: "OpenSans-lightitalic", serif;
		font-size: 20px;
	}

	.Quote-info {
		font-family: "OpenSans-lightitalic", serif;
		font-size: 18px;
	}
</style>
