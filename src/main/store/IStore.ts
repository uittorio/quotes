export interface IStore {
	delete(type: string): void;
	set<T>(key: string, value: Array<T>): void;
	get<T>(key: string): Array<T>;
}