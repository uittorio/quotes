import { QuoteData } from "../../core/quoteData";
import { ApiService } from "../api/apiService";
import { quoteBaseUrl, quoteUrl } from "./quoteUrl";

export class QuoteService {
	public static add(quote: QuoteData): Promise<Array<QuoteData>> {
		return ApiService.get(quoteUrl).then((quotesData: {quotes: Array<QuoteData>}) => {
			const idsOrdered: Array<number> = quotesData.quotes.map((quote: QuoteData) => {
				return quote.id;
			}).map((id: string) => {
				return parseInt(id);
			}).sort()
				.reverse();

			const highestId = idsOrdered[0];
			quote.id = (highestId + 1).toString();
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
}