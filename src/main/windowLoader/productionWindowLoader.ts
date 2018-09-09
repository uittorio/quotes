import { WindowLoader } from "./windowLoader";
import { format as formatUrl } from "url";
import * as path from "path";

export class ProductionWindowLoader implements WindowLoader {
	load(window: Electron.BrowserWindow): void {
		window.loadURL(formatUrl({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file",
			slashes: true
		}))
	}
}