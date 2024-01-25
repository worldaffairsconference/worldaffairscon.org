import type { Session } from "@auth/core/types";

export function sessionHasUser(
	session: Session | null
): session is Required<Session> {
	return session?.user !== undefined;
}
