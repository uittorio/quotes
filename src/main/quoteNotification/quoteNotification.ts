import { NotificationService } from "../notificationService/notificationService";
import { QuotesDate } from "../../date/date";
import { QuoteData } from "../../core/quoteData";
import { QuoteWindow } from "../quotesWindow/quoteWindow";

export class QuoteNotification {
	public static get(quoteNotification: NotificationService<QuoteData>,
										date: QuotesDate,
										window: QuoteWindow,
										notificationEnabled: boolean): void {
		if (quoteNotification.hasAlreadySeenAll()) {
			quoteNotification.resetNotifications();
		}
		
		const hasAlreadySent: boolean = quoteNotification.hasAlreadySentOn(date);
		const isAfter: boolean = quoteNotification.isValidTime(date);
		
		if (!hasAlreadySent && isAfter) {
			const notification: QuoteData = quoteNotification.getRandomNotificationOn(date);
			window.sendQuote(notification);
			
			if (notificationEnabled) {
				window.sendNotification(notification);
			}
		} else {
			const latestNotification: QuoteData | undefined = quoteNotification.getLatestNotification();
			if (latestNotification) {
				window.sendQuote(latestNotification);
			} else {
				window.sendQuote({
					id: "empty",
					title: "",
					author: "",
					book: "",
					text: "There are not quotes"
				})
			}
		}
	}
}