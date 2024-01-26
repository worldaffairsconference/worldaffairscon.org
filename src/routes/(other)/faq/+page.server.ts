import { xata } from "$lib/server/xata";
import { groupBy, markdownToHtml } from "$lib/utils";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const questionRecords = await xata.db.frequently_asked_questions
		.select(["question", "answer", "category.name"])
		.getAll();
	const questions = questionRecords.flatMap(
		({ question, answer, category }) =>
			question && answer && category?.name
				? {
						question,
						answer: markdownToHtml(answer),
						category: category.name
					}
				: []
	);
	const faqByCategories = groupBy(questions, (q) => q.category);
	return { faqByCategories };
}) satisfies PageServerLoad;
