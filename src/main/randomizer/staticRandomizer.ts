import { Randomizer } from "./randomizer";

export class StaticRandomizer<T> implements Randomizer<T> {
	get(data: Array<T>): number {
		return 0;
	}
}