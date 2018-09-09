import { WindowLoader } from "./windowLoader";

export class DevelopmentWindowLoader implements WindowLoader {
	load(window: Electron.BrowserWindow): void {
		window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
	}
}