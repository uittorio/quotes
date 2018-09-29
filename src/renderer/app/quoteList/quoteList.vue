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
                <button v-on:click="deleteQuote(quote)">
                    <img src="../../icons/delete.svg"
                         class="QuoteList-delete"/>
                </button>
            </span>
            </div>
        </div>

        <QuoteButton v-on:pressed="close()"
                     class="QuoteList-back"
                     v-bind:text="'Go Back'">
        </QuoteButton>
    </div>
</template>

<script lang="ts">
	import * as Electron from "electron";
	import QuoteButton from '../button/button.vue';
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
		components: {
			QuoteButton
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
					.catch(() => {});
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteList.scss";
</style>
