<template>
    <div class="QuoteList-container">
        <div class="QuoteList-header">
            <span>Text</span>
            <span>Title</span>
            <span>Author</span>
            <span>Book</span>
            <span class="QuoteList-actionContainer"></span>
        </div>
        <div class="QuoteList-listContainer">
            <div class="QuoteList-quote" v-for="quote in quoteList">
                <span> {{ quote.text}} </span>
                <span> {{ quote.title}} </span>
                <span> {{ quote.author}} </span>
                <span> {{ quote.book}} </span>
                <span class="QuoteList-actionContainer">
                <button class="QuoteList-delete"
                        v-on:click="deleteQuote(quote)">
                    <img src="../../icons/delete.svg"
                         class="QuoteList-deleteQuote"/>
                </button>
            </span>
            </div>
        </div>

        <div class="App-buttonContainer">
            <button v-on:click="close()" class="App-button App-buttonActivate">Go back</button>
        </div>
    </div>
</template>

<script lang="ts">
	import * as Electron from "electron";
	import ipcRenderer = Electron.ipcRenderer;
	const smalltalk = require('smalltalk');

	export default {
		props: ['quoteList'],
		name: "QuoteList",
		data: function () {
			return {
				test: []
			}
		},
		methods: {
			close: function () {
				this.$emit("cancel");
			},
			deleteQuote: function (quote) {
				smalltalk
					.confirm('Bye Bye Quote', '', {
						buttons: {
							ok: 'Delete',
							cancel: 'I was wrong'
						}
					})
					.then(() => {
						ipcRenderer.send('delete-quote', quote);
					})
					.catch(() => {

					});
			}
		}
	}
</script>

<style>
    @import "./quoteList.scss";
</style>
