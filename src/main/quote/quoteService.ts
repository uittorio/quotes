import { QuoteData } from "../../core/quoteData";
import { ApiService } from "../api/apiService";
import { quoteBaseUrl, quoteUrl } from "./quoteUrl";
const uuid = require('uuid/v4');


export class QuoteService {
	public static add(quote: QuoteData): Promise<Array<QuoteData>> {
		return ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			quote.id = uuid();
			quotesData.quotes.push(quote);
			
			return QuoteService._update(quoteBaseUrl, quotesData);
		}).catch((e) => {
			return e;
		});
	}
	
	static remove(quote: QuoteData) {
		return ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			const quotesUpdated: { quotes: Array<QuoteData> } = {
				quotes: quotesData.quotes.filter((quoteData) => {
					return quoteData.id !== quote.id;
				})
			};
			
			return QuoteService._update(quoteBaseUrl, quotesUpdated);
		}).catch((e) => {
			return e;
		})
	}
	
	static edit(quoteToReplace: QuoteData) {
		return ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			const quoteIndex = quotesData.quotes.findIndex((quote: QuoteData) => {
				return quoteToReplace.id === quote.id;
			});
			
			quotesData.quotes[quoteIndex] = quoteToReplace;
			
			return QuoteService._update(quoteBaseUrl, quotesData);
		}).catch((e) => {
			return e;
		});
	}
	
	static _update(url: string, list: { quotes: Array<QuoteData> } ) {
		return ApiService.update(url, list).then((quotesData: {quotes: Array<QuoteData>}) => {
			return quotesData.quotes;
		}).catch((e) => {
			return e;
		})
	}
}