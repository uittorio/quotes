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
const Store = require('electron-store');
const https = require('https');
const quoteUrl: string = "https://api.jsonbin.io/b/5b9584323ffac56f4bdbf2ad/latest";

QuoteApp.create().then(() => {
	let windowLoader: WindowLoader;
	
	if (isDevelopment) {
		windowLoader = new DevelopmentWindowLoader();
	} else {
		windowLoader = new ProductionWindowLoader();
	}
	
	const window: QuoteWindow = QuoteWindow.create(windowLoader);
	const randomizer: StandardRandomizer<QuoteData> = new StandardRandomizer();
	let notificationEnabled: boolean = false;
	
	window.onHide(() => {
		notificationEnabled = true;
	});
	
	window.onShow(() => {
		notificationEnabled = false;
	});
	
	window.ready().then(() => {
		https.get(quoteUrl, (resp: any) => {
			let data = "";
			
			resp.on('data', (chunk: any) => {
				data += chunk;
			});
			
			resp.on('end', () => {
				showQuote(JSON.parse(data).quotes);
			});
		});
	});
	
	function showQuote(data: Array<QuoteData>) {
		const timeInFrequency = QuotesDate.hourMinutes(16, 0);
		
		const notificationService = new NotificationService<QuoteData>(data, new OnceADay(), timeInFrequency, new Store(), randomizer);
		
		QuoteNotification.get(notificationService, QuotesDate.now(), window, notificationEnabled);
		
		setInterval(() => {
			QuoteNotification.get(notificationService, QuotesDate.now(), window, notificationEnabled);
		}, 3000);
	}
});
