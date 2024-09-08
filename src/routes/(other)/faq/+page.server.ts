// import faqData from '$lib/faqData.json';
// import { groupBy } from "$lib/utils";
// import type { PageServerLoad } from "./$types";

// export const load: PageServerLoad = async () => {
//     const questions = Object.entries(faqData).flatMap(([categoryName, records]) =>
//         records.map(({ question, answer }) => ({
//             question,
//             answer,
//             category: categoryName
//         }))
//     );

//     const faqByCategories = groupBy(questions, (q) => q.category);

//     return {
//         faqByCategories
//     };
// };
