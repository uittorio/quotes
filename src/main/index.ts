import { QuotesDate } from "../date/date";
const isDevelopment = process.env.NODE_ENV !== "production";
import { QuoteData } from "../core/quoteData";
import { QuoteApp } from "./quoteApp/quoteApp";
import { QuoteWindow } from "./quotesWindow/quoteWindow";
import { WindowLoader } from "./windowLoader/windowLoader";
import { DevelopmentWindowLoader } from "./windowLoader/developmentWindowLoader";
import { ProductionWindowLoader } from "./windowLoader/productionWindowLoader";
import { NotificationService } from "./notificationService/notificationService";
import { OnceADay } from "./frequency/onceADay";
import { QuoteNotification } from "./quoteNotification/quoteNotification";
import { StandardRandomizer } from "./randomizer/standardRandomizer";
import * as Electron from "electron";
import { ApiService } from "./api/apiService";
import { QuoteService } from "./quote/quoteService";
import { quoteUrl } from "./quote/quoteUrl";
import { QuoteList } from "./quote/quoteList";
const Store = require('electron-store');

QuoteApp.create().then(() => {
	function removeCheckShowQuote() {
		clearInterval(intervalNotification);
	}
	
	let windowLoader: WindowLoader;
	let intervalNotification;
	
	if (isDevelopment) {
		windowLoader = new DevelopmentWindowLoader();
	} else {
		windowLoader = new ProductionWindowLoader();
	}
	
	const window: QuoteWindow = QuoteWindow.create(windowLoader);
	window.registerEventOnClose(removeCheckShowQuote);
	
	window.ready().then(() => {
		window.sendLoading();
		ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			window.sendFinishLoading();
			window.sendQuoteList(quotesData.quotes);
			showQuote(new QuoteList(quotesData.quotes));
		});
	});
	
	Electron.ipcMain.on("new-quote", (event: any, quote: QuoteData) => {
		window.sendLoading();
		QuoteService.add(quote).then((quoteData: Array<QuoteData>) => {
			afterUpdate(quoteData);
			
		});
	});
	
	
	Electron.ipcMain.on("edit-quote", (event: any, quote: QuoteData) => {
		window.sendLoading();
		QuoteService.edit(quote).then((quoteData: Array<QuoteData>) => {
			afterUpdate(quoteData);
		});
	});
	
	
	Electron.ipcMain.on("delete-quote", (event: any, quote: QuoteData) => {
		window.sendLoading();
		QuoteService.remove(quote).then((quoteData: Array<QuoteData>) => {
			afterUpdate(quoteData);
		});
	});
	
	function afterUpdate(quoteData) {
		window.sendQuoteList(quoteData);
		removeCheckShowQuote();
		showQuote(new QuoteList(quoteData));
		window.sendFinishLoading();
	}
	
	function showQuote(list: QuoteList) {
		const randomizer: StandardRandomizer<QuoteData> = new StandardRandomizer();
		
		const timeInFrequency = QuotesDate.hourMinutes(9, 0);
		const notificationService = new NotificationService<QuoteData>(list.get(),
			new OnceADay(),
			timeInFrequency,
			new Store(),
			randomizer);
		
		
		QuoteNotification.get(notificationService, QuotesDate.now(), window);
		
		intervalNotification = setInterval(() => {
			QuoteNotification.get(notificationService, QuotesDate.now(), window);
		}, 3000);
	}
});
