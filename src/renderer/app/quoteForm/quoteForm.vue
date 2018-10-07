<template>
    <div class="QuoteForm-container">
        <form class="QuoteForm-inputContainer" @submit="checkForm">
            <label for="title">Title</label>
            <input class="QuoteForm-input"
                   id="title"
                   type="text"
                   v-model="quote.title">
        </form>
        <div class="QuoteForm-inputContainer">
            <label for="author">Author</label>
            <input class="QuoteForm-input"
                   id="author"
                   type="text"
                   v-model="quote.author">
        </div>
        <div class="QuoteForm-inputContainer">
            <label for="book">Book</label>
            <input class="QuoteForm-input"
                   id="book"
                   type="text"
                   v-model="quote.book">
        </div>
        <div class="QuoteForm-inputContainer">
            <label for="quote">Quote</label>
            <textarea class="QuoteForm-input"
                      id="quote"
                      rows="4"
                      v-model="quote.text"></textarea>
        </div>

        <div class="QuoteForm-buttonContainer">
            <QuoteButton
                    v-if="isNewQuote"
                    v-on:pressed="save()"
                    class="QuoteForm-save"
                    v-bind:text="'Add'">
            </QuoteButton>

            <QuoteButton
                    v-if="!isNewQuote"
                    v-on:pressed="edit()"
                    class="QuoteForm-save"
                    v-bind:text="'Save'">
            </QuoteButton>

            <QuoteButton
                    v-if="!isNewQuote"
                    v-on:pressed="deleteQuote()"
                    class="QuoteForm-delete"
                    v-bind:text="'Delete'">
            </QuoteButton>
        </div>

        <div v-if="errors.length" class="QuoteForm-error">
            <div v-for="error in errors">{{ error }}</div>
        </div>
    </div>
</template>

<script lang="ts">
	import * as Electron from "electron";
	import QuoteButton from "../button/button";
	import ipcRenderer = Electron.ipcRenderer;

	const smalltalk = require('smalltalk');

	export default {
		name: "QuoteForm",
		components: {QuoteButton},
		data: () => {
			return {
				errors: [],
				isNewQuote: false,
				quote: {}
			}
		},
		created: function () {
			this.quote = this.quoteToEdit;
			this.isNewQuote = !this.quoteToEdit.id
		},
		methods: {
			checkForm: function () {
				this.errors = [];
				const quote = this.quote;

				if (!quote.text) {
					this.errors.push("please enter a quote");
				}

				if (!quote.author) {
					this.errors.push("please enter an author");
				}

				if (!quote.title) {
					this.errors.push("please enter a title");
				}
			},
			save: function () {
				this.checkForm();
				if (this.errors.length <= 0) {
					ipcRenderer.send('new-quote', this.quote);
					this.$emit("cancel");
				}
			},
			deleteQuote: function () {
				smalltalk
					.confirm('Bye Bye Quote', '', {
						buttons: {
							ok: 'Delete',
							cancel: 'I was wrong'
						}
					})
					.then(() => {
						ipcRenderer.send('delete-quote', this.quote);
                        this.$emit("done");
					})
					.catch(() => {
					});
			},
			edit: function () {
				this.checkForm();
				if (this.errors.length <= 0) {
					ipcRenderer.send('edit-quote', this.quoteToEdit);
					this.$emit("done");
				}
			}
		},
		props: ['quoteToEdit']
	}
</script>

<style lang="scss">
    @import "./quoteForm.scss";
</style>
