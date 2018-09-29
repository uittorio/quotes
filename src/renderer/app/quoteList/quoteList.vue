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
	const smalltalk = require('smalltalk');
    import ipcRenderer = Electron.ipcRenderer;

	export default {
      props: ['quoteList'],
      name: "QuoteList",
      data: function() {
      	return {
      		test: []
        }
      },
      methods: {
        close: function () {
          this.$emit("cancel");
        },
        deleteQuote: function(quote) {
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
    .QuoteList-header {
        padding-bottom: 30px;
        font-family: "OpenSans-semibold", serif;
    }

    .QuoteList-header, .QuoteList-quote {
        display: flex;
        align-items: center;
    }

    .QuoteList-header span, .QuoteList-quote span {
        flex: 1 0 0;
    }

    .QuoteList-header span:first-child, .QuoteList-quote span:first-child {
        flex: 2 0 0;
    }

    .QuoteList-header span, .QuoteList-quote span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .QuoteList-quote span {
        font-family: "OpenSans-lightitalic", serif;
    }

    .QuoteList-quote span:not(:last-child), .QuoteList-header span:not(:last-child) {
        padding-right: 10px;
    }

    .QuoteList-quote:not(:last-child) {
        padding-top: 5px;
    }

    .QuoteList-header .QuoteList-actionContainer,
    .QuoteList-quote .QuoteList-actionContainer {
        flex: 0.5 0 0;
    }

    .QuoteList-delete {
        cursor: pointer;
    }

    .QuoteList-deleteQuote {
        width: 30px;
        height: 30px;
    }
</style>
