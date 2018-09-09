import { Randomizer } from "./randomizer";

export class StandardRandomizer<T> implements Randomizer<T> {
	get(data: Array<T>): number {
		return Math.floor(Math.random() * (data.length - 1))
	}
}