import * as Electron from "electron";

export class QuoteApp {
	static create() {
		return new Promise((resolve) => {
			Electron.app.on('ready', () => {
				resolve()
			});
			
			Electron.app.setLoginItemSettings({
				openAtLogin: false
			});
		})
	}
}