<template>
    <div class="App-container" v-if="quote.text">

        <div v-if="loading"
             class="App-loadingContainer">
            <loading class="App-loading"></loading>
        </div>
        <quoteView v-bind:quoteList="quoteList"
                   v-bind:quote="quote"
                   v-bind:settingsTime="settingsTime">
        </quoteView>
    </div>
</template>

<script lang="ts">
	import Loading from "./loading/loading.vue";
	import QuoteView from "./quoteView/quoteView.vue";

	export default {
      components: {
        QuoteView,
        Loading
      },
      props: ['quote', 'loading', 'quoteList', 'settingsTime'],
	}
</script>

<style lang="scss">
    @import "./app.scss";
</style>
