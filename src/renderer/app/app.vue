<template>
    <div class="App-container" v-if="quote.text">
        <div v-if="!listActive" class="App-buttonListContainer">
            <button v-on:click="showList()"
                    class="App-button App-buttonList">All quotes</button>
        </div>
        <div v-if="loading"
             class="App-loadingContainer">
            <loading class="App-loading"></loading>
        </div>
        <quoteForm v-if="formActive" v-on:cancel="hideForm()"></quoteForm>
        <quoteList v-bind:quote-list="quoteList" v-if="listActive" v-on:cancel="hideList()"></quoteList>
        <quote v-if="!formActive && !listActive" v-bind:quote="quote" class="App-quote"></quote>
        <div v-if="!formActive && !listActive" class="App-buttonContainer">
            <button v-on:click="showForm()"
                    class="App-button App-buttonActivate">Add new Quote</button>
        </div>
    </div>
</template>

<script lang="ts">
	import Quote from "./quote/quote";
	import QuoteForm from "./quoteForm/quoteForm.vue";
	import Loading from "./loading/loading.vue";
		import QuoteList from "./quoteList/quoteList";

	export default {
      components: {
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

<style>
    @import "./app.scss";
</style>
