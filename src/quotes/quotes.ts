import { QuoteData } from "../core/quoteData";

export const QuotesData: Array<QuoteData> = [
	{
		"title": "Expressiveness",
		"author": "Robert C. Martin (Uncle Bob)",
		"book": "Clean Code",
		"text": "We want to be able to hear a class or function name and not be surprised when we discover its responsibilities.",
		"id": "1"
	},
	{
		"title": "Decision Making",
		"author": "Robert C. Martin (Uncle Bob)",
		"book": "Clean Code",
		"text": "Modularity and separation of concerns make decentralized management and decision making possible. In a sufficiently large system, whether it is a city or a software project, no one person can make all the decisions. We all know it is best to give responsibilities to the most qualified persons. We often forget that it is also best to postpone decisions until the last possible moment. This isn’t lazy or irresponsible; it lets us make informed choices with the best possible information. A premature decision is a decision made with suboptimal knowledge. We will have that much less customer feedback, mental reflection on the project, and experience with our implementation choices if we decide too soon..",
		"id": "2"
	},
	{
		"title": "Architecture",
		"author": "Robert C. Martin (Uncle Bob)",
		"book": "Clean Code",
		"text": "It is not necessary to do a Big Design Up Front (BDUF). In fact, BDUF is even harmful because it inhibits adapting to change, due to the psychological resistance to discarding prior effort and because of the way architecture choices influence subsequent thinking about the design. Building architects have to do BDUF because it is not feasible to make radical architectural changes to a large physical structure once construction is well underway. Although software has its own physics, it is economically feasible to make radical change, if the structure of the software separates its concerns effectively. This means we can start a software project with a “naively simple” but nicely decoupled architecture, delivering working user stories quickly, then adding more infrastructure as we scale up. Some of the world’s largest Web sites have achieved very high availability and performance, using sophisticated data caching, security, virtualization, and so forth, all done efficiently and flexibly because the minimally coupled designs are appropriately simple at each level of abstraction and scope. Of course, this does not mean that we go into a project “rudderless.” We have some expectations of the general scope, goals, and schedule for the project, as well as the general structure of the resulting system. However, we must maintain the ability to change course in response to evolving circumstances.",
		"id": "3"
	}
];