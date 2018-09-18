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
		const randomizer: StandardRandomizer<QuoteData> = new StandardRandomizer();
		
		const timeInFrequency = QuotesDate.hourMinutes(9, 0);
		const notificationService = new NotificationService<QuoteData>(data,
			new OnceADay(),
			timeInFrequency,
			new Store(),
			randomizer);
		
		QuoteNotification.get(notificationService, QuotesDate.now(), window);
		
		setInterval(() => {
			QuoteNotification.get(notificationService, QuotesDate.now(), window);
		}, 3000);
	}
});
