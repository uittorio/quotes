import { QuoteData } from "../../core/quoteData";

export class QuoteList {
	private readonly _list: Array<QuoteData>;
	
	constructor(list: Array<QuoteData>) {
		this._list = list;
	}
	
	public get(): Array<QuoteData> {
		return this._list;
	}
}