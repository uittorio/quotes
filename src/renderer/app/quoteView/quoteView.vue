<template>
    <div>
        <quoteNavigation
                v-on:goToList="changeToList()"
                v-on:goToForm="changeToForm()"
                v-on:goToHome="changeToQuote()"
                v-on:goToSettings="changeToSettings()">
        </quoteNavigation>
        <div class="QuoteView-container">
            <quote-settings v-if="isSettingsActive"
                            v-bind:settingsTime="settingsTime">
            </quote-settings>
            <quoteForm v-if="isFormActive"
                       v-bind:quoteToEdit="quoteToEdit"
                       v-on:done="changeToQuote()">
            </quoteForm>
            <quoteList v-bind:quote-list="quoteList"
                       v-if="isListActive"
                       v-on:edit="editQuote($event)">
            </quoteList>
            <quote v-if="isQuoteActive"
                   v-bind:quote="quote">
            </quote>
        </div>
    </div>

</template>

<script lang="ts">
    import { QuoteRoutes } from "../quoteRoutes/quoteRoutes";
    import Quote from "./../quote/quote.vue";
    import QuoteList from "./../quoteList/quoteList.vue";
    import QuoteForm from "./../quoteForm/quoteForm.vue";
    import QuoteNavigation from "./../quoteNavigation/quoteNavigation.vue";
		import QuoteSettings from "../settings/settings";

	export default {
		components: {QuoteSettings, Quote, QuoteList,QuoteForm, QuoteNavigation},
		data: function() {
          return {
          	route: QuoteRoutes.QUOTE,
            quoteToEdit: {
              id: "",
              title: "",
              author: "",
              text: "",
              book: ""
            }
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
          },
          isSettingsActive: function() {
          	return this.route === QuoteRoutes.SETTINGS;
          }
		},
        methods: {
          changeToList: function() {
            this.route = QuoteRoutes.LIST;
          },
          changeToQuote: function() {
            this.route = QuoteRoutes.QUOTE;
          },
          changeToSettings: function() {
          	this.route = QuoteRoutes.SETTINGS;
          },
          changeToForm: function() {
            this.quoteToEdit = {
              id: "",
              title: "",
              author: "",
              text: "",
              book: ""
            };
            this.route = QuoteRoutes.FORM;
          },
          editQuote: function(quote) {
          	this.quoteToEdit = quote;
            this.route = QuoteRoutes.FORM;
          }
        },
		props: ['quote', 'quoteList', 'settingsTime']
	}
</script>
<style lang="scss">
    @import "./quoteView.scss";
</style>