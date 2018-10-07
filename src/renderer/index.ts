import Vue from "Vue";
import * as Electron from "electron";
import { QuoteData } from "../core/quoteData";
import App from "./app/app.vue";

new Vue({
	el: "#app",
	data: {
		quote: {},
		loading: false,
		quoteList: []
	},
	render(h) {
		return h(App, {
			props: {
				quote: this.quote,
				loading: this.isLoading,
				quoteList: this.quoteList,
				settingsTime: this.settingsTime,
				settingsAutoStartUp: this.settingsAutoStartUp
			}
		})
	},
	created: function () {
		this.isLoading = false;
		
		Electron.ipcRenderer.on('quote' , (event: any , data: { msg: QuoteData }) => {
			this.quote = data.msg;
		});
		
		Electron.ipcRenderer.on('notification' , (event: any , data: { msg: QuoteData }) => {
			new Notification("Message of the day", {
				body: data.msg.title
			});
		});
		
		Electron.ipcRenderer.on('loading' , (event: any , data: { msg: QuoteData }) => {
			this.isLoading = true;
		});
		
		Electron.ipcRenderer.on('finishLoading' , (event: any , data: { msg: QuoteData }) => {
			this.isLoading = false;
		});
		
		Electron.ipcRenderer.on('quoteList' , (event: any , data: { list: Array<QuoteData> }) => {
			this.quoteList = data.list;
		});
		
		Electron.ipcRenderer.on('settings-time' , (event: any , data: { time: string}) => {
			this.settingsTime = data.time;
		});
		
		Electron.ipcRenderer.on('settings-autoStartUp' , (event: any , data: { autoStartUp: boolean}) => {
			this.settingsAutoStartUp = data.autoStartUp;
		});
	}
});



