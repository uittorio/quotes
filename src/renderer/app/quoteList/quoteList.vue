<template>
    <div class="QuoteList-container">
        <div class="QuoteList-noQuotes"
             v-if="quoteList.length <= 0">
            There are not quotes
        </div>
        <div v-if="quoteList.length > 0">
            <div class="QuoteList-header">
                <span class="QuoteList-data">Text</span>
                <span class="QuoteList-data">Title</span>
                <span class="QuoteList-data">Author</span>
                <span class="QuoteList-data">Book</span>
                <span class="QuoteList-data QuoteList-actionContainer"></span>
            </div>
            <div class="QuoteList-listContainer">
                <div class="QuoteList-quote" v-for="quote in quoteList">
                    <span class="QuoteList-data"> {{ quote.text}} </span>
                    <span class="QuoteList-data"> {{ quote.title}} </span>
                    <span class="QuoteList-data"> {{ quote.author}} </span>
                    <span class="QuoteList-data"> {{ quote.book}} </span>
                    <span class="QuoteList-data QuoteList-actionContainer">
                <button v-on:click="editQuote(quote)">
                    <img src="../../icons/edit.svg"
                         class="QuoteList-edit"/>
                </button>
            </span>
                </div>
            </div>
        </div>
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
			editQuote: function (quote) {
              this.$emit("edit", quote);
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteList.scss";
</style>
