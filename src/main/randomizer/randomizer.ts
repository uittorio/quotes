export interface Randomizer<T> {
	get(list: Array<T>): number;
}