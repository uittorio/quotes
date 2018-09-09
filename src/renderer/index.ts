import Vue from "Vue";
import Quote from "./quote/Quote.vue";
import * as Electron from "electron";
import { QuoteData } from "../core/quoteData";

new Vue({
	el: "#app",
	data: {
		quote: {}
	},
	render(h) {
		return h(Quote, {
			props: {
				quote: this.quote
			}
		})
	},
	created: function () {
		Electron.ipcRenderer.on('quote' , (event: any , data: { msg: QuoteData }) => {
			this.quote = data.msg;
		});
		
		Electron.ipcRenderer.on('notification' , (event: any , data: { msg: QuoteData }) => {
			new Notification("Message of the day", {
				body: data.msg.title
			});
		});
		
	}
});



