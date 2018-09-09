import * as Electron from "electron";
import { WindowLoader } from "../windowLoader/windowLoader";
import { QuoteData } from "../../core/quoteData";
import BrowserWindow = Electron.BrowserWindow;

export class QuoteWindow {
	private readonly _window: Electron.BrowserWindow;
	
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
	}
	
	static create(winLoader: WindowLoader) {
		return new QuoteWindow(winLoader);
	}
	
	public ready(): Promise<void> {
		return new Promise((resolve) => {
			this._window.once('ready-to-show', () => {
				this._window.show();
				resolve()
			});
		});
	}
	
	public onHide(fn: () => void) {
		this._window.on("hide", () => {
			fn();
		});
	}
	
	public onShow(fn: () => void) {
		this._window.on("show", () => {
			fn();
		});
	}
	
	public sendQuote(quote: QuoteData): void {
		this._window.webContents.send('quote' , { msg: quote });
	}
	
	sendNotification(notification: QuoteData) {
		this._window.webContents.send("notification", { msg: notification });
	}
}