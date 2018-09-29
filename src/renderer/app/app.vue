<template>
    <div class="App-container" v-if="quote.text">
        <quoteButton v-on:pressed="showList()"
                     v-if="!listActive && !formActive"
                     class="App-buttonList"
                     v-bind:text="'All quotes'">
        </quoteButton>
        <div v-if="loading"
             class="App-loadingContainer">
            <loading class="App-loading"></loading>
        </div>
        <quoteForm v-if="formActive" v-on:cancel="hideForm()"></quoteForm>
        <quoteList v-bind:quote-list="quoteList" v-if="listActive" v-on:cancel="hideList()"></quoteList>
        <quote v-if="!formActive && !listActive" v-bind:quote="quote" class="App-quote"></quote>

        <quoteButton v-on:pressed="showForm()"
                     v-if="!formActive && !listActive"
                     class="App-buttonAdd"
                     v-bind:text="'Add new Quote'">
        </quoteButton>
    </div>
</template>

<script lang="ts">
	import Quote from "./quote/quote";
	import QuoteForm from "./quoteForm/quoteForm.vue";
	import Loading from "./loading/loading.vue";
    import QuoteList from "./quoteList/quoteList";
    import QuoteButton from "./button/button";

	export default {
      components: {
        QuoteButton,
        QuoteList,
      	Quote,
        QuoteForm,
        Loading
      },
      data: () => {
        return {
          formActive: false,
          listActive: false
        }
      },
      props: ['quote', 'loading', 'quoteList'],
      methods: {
        showList: function() {
		    this.listActive = true
        },
        hideList: function() {
            this.listActive = false;
        },
      	showForm: function() {
          this.formActive = true;
        },
        hideForm: function () {
          this.formActive = false;
        }
      }
	}
</script>

<style lang="scss">
    @import "./app.scss";
</style>
