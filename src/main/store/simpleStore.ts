import { IStore } from "./IStore";

export class SimpleStore implements IStore {
	private readonly _types: any;
	
	constructor() {
		this._types = {}
	}
	
	delete(type: string): void {
		delete this._types[type];
	}
	
	get<T>(key: string): Array<T> {
		return this._types[key];
	}
	
	set<T>(key: string, value: Array<T>): void {
		this._types[key] = value;
	}
}