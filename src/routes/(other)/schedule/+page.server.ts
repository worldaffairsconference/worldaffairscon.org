import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { xata } from "$lib/server/xata";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user?.email) throw redirect(303, "/");

	const plenaryIds = await xata.db.attendees_plenaries
		.filter("attendee.id", session.user.id)
		.select(["plenary.id"])
		.getAll();

	const schedule = await xata.db.plenaries
		.filter({
			id: {
				$any: plenaryIds.flatMap(({ plenary }) =>
					plenary ? [plenary.id] : []
				)
			}
		})
		.select([
			"theme",
			"location.name",
			"scheduleSlot.startTime",
			"scheduleSlot.endTime",
			{
				name: "<-speakers.plenary",
				as: "speakers",
				columns: ["name", "title"]
			}
		])
		.getAll();

	return {
		schedule: schedule.map(
			({ theme, location, scheduleSlot, speakers }) => ({
				title: theme ?? "",
				location: location?.name ?? "",
				startTime: scheduleSlot?.startTime ?? new Date(0),
				endTime: scheduleSlot?.endTime ?? new Date(0),
				description:
					speakers?.records
						.map(({ name, title }) => `${name} (${title})`)
						.join(" / ") ?? ""
			})
		)
	};
};
