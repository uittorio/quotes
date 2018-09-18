import * as Electron from "electron";
import { WindowLoader } from "../windowLoader/windowLoader";
import { QuoteData } from "../../core/quoteData";
import BrowserWindow = Electron.BrowserWindow;
import { Messenger } from "../messenger";

export class QuoteWindow implements Messenger {
	private readonly _window: Electron.BrowserWindow;
	private _notificationEnabled: boolean = false;
	
	constructor(winLoader: WindowLoader) {
		this._window = new BrowserWindow({
			show: false,
			title: "Quotes",
			width: 700,
			height: 500,
		});
		
		winLoader.load(this._window);
		
		this._window.on('closed', () => {
			(this._window as any) = null;
		});
		
		this._window.on("hide", () => {
			this._notificationEnabled = true;
		});
		
		this._window.on("show", () => {
			this._notificationEnabled = false;
		});
	}
	
	static create(winLoader: WindowLoader) {
		return new QuoteWindow(winLoader);
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
		if (this._notificationEnabled) {
			this._window.webContents.send("notification", { msg: notification });
		}
	}
}