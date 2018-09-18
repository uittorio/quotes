import { QuotesDate } from "../src/date/date";
import { OnceADay } from "../src/main/frequency/onceADay";
import { QuoteNotification } from "../src/main/quoteNotification/quoteNotification";
import { QuoteData } from "../src/core/quoteData";
import { StaticRandomizer } from "../src/main/randomizer/staticRandomizer";
import { SimpleStore } from "../src/main/store/simpleStore";
import { Messenger } from "../src/main/messenger";
import { NotificationService } from "../src/main/notificationService/notificationService";

describe('quote notification', () => {
	let notificationService: NotificationService<QuoteData>;
	let quotes: Array<QuoteData>;
	let randomizer: StaticRandomizer<QuoteData>;
	let windowSpy: Messenger;

	beforeEach(() => {
		windowSpy = jasmine.createSpyObj("Messenger", ["sendQuote", "sendNotification"]);
		randomizer = new StaticRandomizer<QuoteData>();
		quotes = [
			{
				id: "1",
				text: "a test",
				title: "a title",
				author: "an author",
				book: "a book"
			},
			{
				id: "2",
				text: "a test 2",
				title: "a title 2",
				author: "an author 2",
				book: "a book 2"
			}
		]
	});

	describe('when notification is once a day at 9 am', () => {
		let timeFrame: QuotesDate;

		beforeEach(() => {
			timeFrame = QuotesDate.hourMinutes(9, 0);
		});

		describe('when the time is before 9 am and there are previous notification', () => {
			let dateToCheck: QuotesDate;
			
			beforeEach(() => {
				notificationService = new NotificationService(quotes, new OnceADay(), timeFrame, new SimpleStore(), randomizer);
				dateToCheck = QuotesDate.yearMonthDayHourMinute(2018, 11, 9, 12, 0);
			});

			it('should return the previous notification', () => {
				QuoteNotification.get(notificationService, dateToCheck, windowSpy);
				expect(windowSpy.sendQuote).toHaveBeenCalledWith(quotes[0]);
			});
		});
		
		describe('when the time is after 9 am and it sent already all the notification', () => {
			let dateToCheck: QuotesDate;
			
			beforeEach(() => {
				quotes = [
					{
						id: "1",
						text: "a test",
						title: "a title",
						author: "an author",
						book: "a book"
					}
				];
				
				notificationService = new NotificationService(quotes, new OnceADay(), timeFrame, new SimpleStore(), randomizer);
				dateToCheck = QuotesDate.yearMonthDayHourMinute(2018, 11, 9, 12, 0);
			});

			it('should return the previous notification', () => {
				QuoteNotification.get(notificationService, dateToCheck, windowSpy);
				expect(windowSpy.sendQuote).toHaveBeenCalledWith(quotes[0]);
				expect(windowSpy.sendNotification).toHaveBeenCalledWith(quotes[0]);
				(windowSpy.sendQuote as jasmine.Spy).calls.reset();
				(windowSpy.sendNotification as jasmine.Spy).calls.reset();
				QuoteNotification.get(notificationService, dateToCheck, windowSpy);
				expect(windowSpy.sendQuote).toHaveBeenCalledWith(quotes[0]);
			});
		});
	});
});