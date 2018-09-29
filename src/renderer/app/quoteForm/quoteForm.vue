<template>
    <div class="QuoteForm-container">
        <form class="QuoteForm-inputContainer" @submit="checkForm">
            <label for="title">Title</label>
            <input class="QuoteForm-input"
                   id="title"
                   type="text"
                   v-model="title">
        </form>
        <div class="QuoteForm-inputContainer">
            <label for="author">Author</label>
            <input class="QuoteForm-input"
                   id="author"
                   type="text"
                   v-model="author">
        </div>
        <div class="QuoteForm-inputContainer">
            <label for="book">Book</label>
            <input class="QuoteForm-input"
                   id="book"
                   type="text"
                   v-model="book">
        </div>
        <div class="QuoteForm-inputContainer">
            <label for="quote">Quote</label>
            <textarea class="QuoteForm-input"
                      id="quote"
                      rows="4"
                      v-model="text"></textarea>
        </div>

        <div class="QuoteForm-buttonContainer">
            <QuoteButton v-on:pressed="save()"
                         class="QuoteForm-save"
                         v-bind:text="'Add'">
            </QuoteButton>
            <QuoteButton v-on:pressed="close()"
                         class="QuoteForm-close"
                         v-bind:text="'Cancel'">
            </QuoteButton>
        </div>

        <div v-if="errors.length" class="QuoteForm-error">
            <div v-for="error in errors">{{ error }}</div>
        </div>
    </div>
</template>

<script lang="ts">
	import * as Electron from "electron";
	import { QuoteData } from "../../../core/quoteData";
	import ipcRenderer = Electron.ipcRenderer;
		import QuoteButton from "../button/button";

	export default {
		name: "QuoteForm",
			components: {QuoteButton},
			data: () => {
			return {
				errors: [],
				text: "",
				author: "",
				title: "",
				book: ""
			}
		},
		methods: {
			close: function () {
				this.$emit("cancel");
			},
			checkForm: function () {
				this.errors = [];

				if (!this.text) {
					this.errors.push("please enter a quote");
				}

				if (!this.author) {
					this.errors.push("please enter an author");
				}

				if (!this.title) {
					this.errors.push("please enter a title");
				}
			},
			save: function () {
				this.checkForm();
				if (this.errors.length <= 0) {
					const newQuote: QuoteData = {
						text: this.text,
						author: this.author,
						book: this.book,
						title: this.title,
						id: ""
					};

					ipcRenderer.send('new-quote', newQuote);
					this.$emit("cancel");
				}
			}
		}
	}
</script>

<style lang="scss">
    @import "./quoteForm.scss";
</style>
