import { QuoteData } from "../../core/quoteData";
import { ApiService } from "../api/apiService";
import { quoteBaseUrl, quoteUrl } from "./quoteUrl";
const uuid = require('uuid/v4');


export class QuoteService {
	public static add(quote: QuoteData): Promise<Array<QuoteData>> {
		return ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			quote.id = uuid();
			quotesData.quotes.push(quote);

			return ApiService.update(quoteBaseUrl, quotesData).then((quotesData: {quotes: Array<QuoteData>}) => {
				return quotesData.quotes;
			}).catch((e) => {
				return e;
			})
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
			
			return ApiService.update(quoteBaseUrl, quotesUpdated).then((quotesData: {quotes: Array<QuoteData>}) => {
				return quotesData.quotes;
			}).catch((e) => {
				return e;
			})
		}).catch((e) => {
			return e;
		})
	}
}