import * as Electron from "electron";

export class QuoteApp {
	static create(openAtLogin) {
		return new Promise((resolve) => {
			Electron.app.on('ready', () => {
				resolve();
			});
			
			Electron.app.setLoginItemSettings({
				openAtLogin: openAtLogin
			});
			
			Electron.app.setAppUserModelId("com.quotes.id");
		})
	}
}