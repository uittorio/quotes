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
const store = new Store();

function getCurrentTimeInFrequency(): QuotesDate {
	let currentSetting = store.get("setting-time") || "09:00";
	return QuotesDate.fromTimeInput(currentSetting);
}

function getAutoStart() {
	const valueFromStore = store.get("settings-autoStartUp");
	return valueFromStore !== undefined ? valueFromStore : true;
}
QuoteApp.create(getAutoStart()).then(() => {
	function removeCheckShowQuote(): void {
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
			window.sendSettingsTime(getCurrentTimeInFrequency());
			window.sendSettingsAutoStartup(getAutoStart());
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
	
	Electron.ipcMain.on("settings-time", (event: any, time: string) => {
		store.set("setting-time", time);
		window.sendSettingsTime(getCurrentTimeInFrequency());
	});
	
	Electron.ipcMain.on("settings-autoStartUp", (event: any, autoStart: boolean) => {
		store.set("settings-autoStartUp", autoStart);
		window.sendSettingsAutoStartup(getAutoStart());
	});
	
	function afterUpdate(quoteData) {
		window.sendQuoteList(quoteData);
		removeCheckShowQuote();
		showQuote(new QuoteList(quoteData));
		window.sendFinishLoading();
	}
	
	function showQuote(list: QuoteList) {
		const randomizer: StandardRandomizer<QuoteData> = new StandardRandomizer();
		const timeInFrequency = getCurrentTimeInFrequency();
		
		const notificationService = new NotificationService<QuoteData>(list.get(),
			new OnceADay(),
			timeInFrequency,
			store,
			randomizer);
		
		QuoteNotification.get(notificationService, QuotesDate.now(), window);
		
		intervalNotification = setInterval(() => {
			QuoteNotification.get(notificationService, QuotesDate.now(), window);
		}, 3000);
	}
});
