<template>
    <div>
        <quoteForm v-if="isFormActive"
                   v-on:cancel="changeToQuote()">
        </quoteForm>
        <quoteList v-bind:quote-list="quoteList"
                   v-if="isListActive"
                   v-on:cancel="changeToQuote()">
        </quoteList>
        <quote class="App-quote"
               v-if="isQuoteActive"
               v-bind:quote="quote"
               v-on:goToList="changeToList()"
               v-on:goToForm="changeToForm()">
        </quote>
    </div>

</template>

<script lang="ts">
    import { QuoteRoutes } from "../quoteRoutes/quoteRoutes";
    import Quote from "./../quote/quote.vue";
    import QuoteList from "./../quoteList/quoteList.vue";
    import QuoteForm from "./../quoteForm/quoteForm.vue";

	export default {
		components: {Quote, QuoteList,QuoteForm},
		data: function() {
          return {
          	route: QuoteRoutes.QUOTE
          }
        },
		computed: {
          isQuoteActive: function () {
            return this.route === QuoteRoutes.QUOTE;
          },
          isFormActive: function () {
            return this.route === QuoteRoutes.FORM;
          },
          isListActive: function() {
          	return this.route === QuoteRoutes.LIST;
          }
		},
        methods: {
          changeToList: function() {
            this.route = QuoteRoutes.LIST;
          },
          changeToQuote: function() {
            this.route = QuoteRoutes.QUOTE;
          },
          changeToForm: function() {
            this.route = QuoteRoutes.FORM;
          }
        },
		props: ['quote', 'quoteList']
	}
</script>
