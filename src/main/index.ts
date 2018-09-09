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
import { QuotesData } from "../quotes/quotes";
const Store = require('electron-store');

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
		const timeInFrequency = QuotesDate.hourMinutes(16, 0);
		
		const notificationService = new NotificationService<QuoteData>(QuotesData, new OnceADay(), timeInFrequency, new Store(), randomizer);
		
		QuoteNotification.get(notificationService, QuotesDate.now(), window, notificationEnabled);
		
		setInterval(() => {
			QuoteNotification.get(notificationService, QuotesDate.now(), window, notificationEnabled);
		}, 3000);
	});
});
