import BrowserWindow = Electron.BrowserWindow;

export interface WindowLoader {
	load(window: BrowserWindow): void;
}