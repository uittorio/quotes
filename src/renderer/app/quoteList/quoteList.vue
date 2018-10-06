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
                <button v-on:click="editQuote(quote)">
                    <img src="../../icons/edit.svg"
                         class="QuoteList-edit"/>
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
			editQuote: function (quote) {
              this.$emit("edit", quote);
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteList.scss";
</style>
