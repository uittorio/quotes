import * as Electron from "electron";
import { WindowLoader } from "../windowLoader/windowLoader";
import { QuoteData } from "../../core/quoteData";
import BrowserWindow = Electron.BrowserWindow;
import { Messenger } from "../messenger";
import { QuotesDate } from "../../date/date";

export class QuoteWindow implements Messenger {
	private readonly _window: Electron.BrowserWindow;
	private _eventsOnClose: Array<() => void> = [];
	
	constructor(winLoader: WindowLoader) {
		this._window = new BrowserWindow({
			show: false,
			title: "Quotes",
			width: 700,
			height: 500,
		});
		
		winLoader.load(this._window);
		
		this._window.on('closed', () => {
			this._eventsOnClose.forEach((event) => {
				event();
			});
			(this._window as any) = null;
		});
	}
	
	static create(winLoader: WindowLoader) {
		return new QuoteWindow(winLoader);
	}
	
	public registerEventOnClose(event: () => void) {
		this._eventsOnClose.push(event);
	}
	
	public ready(): Promise<void> {
		return new Promise((resolve) => {
			this._window.once('ready-to-show', () => {
				this._window.show();
				resolve();
			});
		});
	}
	
	public sendQuote(quote: QuoteData): void {
		this._window.webContents.send('quote' , { msg: quote });
	}
	
	public sendNotification(notification: QuoteData) {
		if (!this._window.isVisible() || !this._window.isFocused()) {
			this._window.webContents.send("notification", { msg: notification });
		}
	}
	
	public sendFinishLoading() {
		this._window.webContents.send("finishLoading");
	}
	
	public sendLoading() {
		this._window.webContents.send("loading");
	}
	
	public sendQuoteList(quoteData: Array<QuoteData>) {
		this._window.webContents.send("quoteList", {
			list: quoteData
		});
	}
	
	public sendSettingsTime(time: QuotesDate) {
		this._window.webContents.send("settings-time", {
			time: time.date
		});
	}
	
	public sendSettingsAutoStartup(autoStartUp: boolean) {
		this._window.webContents.send("settings-autoStartUp", {
			autoStartUp: autoStartUp
		});
	}
}