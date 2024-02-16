// Generated by Xata Codegen 0.28.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
	BaseClientOptions,
	SchemaInference,
	XataRecord
} from "@xata.io/client";

const tables = [
	{
		name: "attendees",
		columns: [
			{ name: "emailVerified", type: "datetime" },
			{ name: "firstName", type: "string" },
			{ name: "lastName", type: "string" },
			{ name: "gradeLevel", type: "string" },
			{ name: "inPerson", type: "bool" },
			{ name: "needsLunch", type: "bool" },
			{ name: "dietaryRestrictions", type: "text" },
			{ name: "email", type: "email", unique: true },
			{
				name: "paid",
				type: "bool",
				notNull: true,
				defaultValue: "false"
			},
			{ name: "school", type: "link", link: { table: "partner_schools" } }
		],
		revLinks: [
			{ column: "user", table: "auth_accounts" },
			{ column: "user", table: "auth_users_accounts" },
			{ column: "user", table: "auth_users_sessions" },
			{ column: "user", table: "auth_sessions" },
			{ column: "attendee", table: "attendees_plenaries" }
		]
	},
	{
		name: "auth_accounts",
		columns: [
			{ name: "user", type: "link", link: { table: "attendees" } },
			{ name: "type", type: "string" },
			{ name: "provider", type: "string" },
			{ name: "providerAccountId", type: "string" },
			{ name: "refresh_token", type: "string" },
			{ name: "access_token", type: "string" },
			{ name: "expires_at", type: "int" },
			{ name: "token_type", type: "string" },
			{ name: "scope", type: "string" },
			{ name: "id_token", type: "text" },
			{ name: "session_state", type: "string" }
		],
		revLinks: [{ column: "account", table: "auth_users_accounts" }]
	},
	{
		name: "auth_verification_tokens",
		columns: [
			{ name: "identifier", type: "string" },
			{ name: "token", type: "string" },
			{ name: "expires", type: "datetime" }
		]
	},
	{
		name: "auth_users_accounts",
		columns: [
			{ name: "user", type: "link", link: { table: "attendees" } },
			{ name: "account", type: "link", link: { table: "auth_accounts" } }
		]
	},
	{
		name: "auth_users_sessions",
		columns: [
			{ name: "user", type: "link", link: { table: "attendees" } },
			{ name: "session", type: "link", link: { table: "auth_sessions" } }
		]
	},
	{
		name: "auth_sessions",
		columns: [
			{ name: "sessionToken", type: "string" },
			{ name: "expires", type: "datetime" },
			{ name: "user", type: "link", link: { table: "attendees" } }
		],
		revLinks: [{ column: "session", table: "auth_users_sessions" }]
	},
	{
		name: "partner_schools",
		columns: [
			{ name: "domain", type: "string" },
			{ name: "allowsSelfRegistration", type: "bool" },
			{ name: "allowsSelfMealPurchase", type: "bool" },
			{ name: "name", type: "string", unique: true }
		],
		revLinks: [
			{ column: "school", table: "attendees" },
			{ column: "canAdministerSchool", table: "administration_users" }
		]
	},
	{
		name: "plenaries",
		columns: [
			{ name: "speaker", type: "string" },
			{
				name: "scheduleSlot",
				type: "link",
				link: { table: "schedule_slots" }
			},
			{ name: "location", type: "string" },
			{ name: "description", type: "text" }
		],
		revLinks: [{ column: "plenary", table: "attendees_plenaries" }]
	},
	{
		name: "attendees_plenaries",
		columns: [
			{ name: "attendee", type: "link", link: { table: "attendees" } },
			{ name: "preferenceRank", type: "int" },
			{ name: "assigned", type: "bool" },
			{ name: "plenary", type: "link", link: { table: "plenaries" } }
		]
	},
	{
		name: "schedule_slots",
		columns: [
			{ name: "startTime", type: "datetime" },
			{ name: "endTime", type: "datetime" }
		],
		revLinks: [{ column: "scheduleSlot", table: "plenaries" }]
	},
	{
		name: "frequently_asked_questions",
		columns: [
			{ name: "question", type: "string" },
			{ name: "answer", type: "text" },
			{
				name: "category",
				type: "link",
				link: { table: "frequently_asked_questions_categories" }
			}
		]
	},
	{
		name: "frequently_asked_questions_categories",
		columns: [{ name: "name", type: "string" }],
		revLinks: [{ column: "category", table: "frequently_asked_questions" }]
	},
	{
		name: "administration_users",
		columns: [
			{ name: "firstName", type: "string" },
			{ name: "lastName", type: "string" },
			{ name: "email", type: "email", unique: true },
			{ name: "canViewSummaryStatistics", type: "bool" },
			{ name: "canViewAttendees", type: "bool" },
			{ name: "canViewSchools", type: "bool" },
			{ name: "canViewFrequentlyAskedQuestions", type: "bool" },
			{ name: "canViewPlenaries", type: "bool" },
			{ name: "canViewTeam", type: "bool" },
			{
				name: "canAdministerSchool",
				type: "link",
				link: { table: "partner_schools" }
			}
		],
		revLinks: [
			{ column: "user", table: "administration_sessions" },
			{ column: "user", table: "administration_verification_tokens" }
		]
	},
	{
		name: "administration_sessions",
		columns: [
			{
				name: "user",
				type: "link",
				link: { table: "administration_users" }
			},
			{ name: "expiresAt", type: "datetime" }
		]
	},
	{
		name: "administration_verification_tokens",
		columns: [
			{
				name: "user",
				type: "link",
				link: { table: "administration_users" }
			},
			{ name: "expiresAt", type: "datetime" },
			{ name: "token", type: "string" }
		]
	},
	{
		name: "general_settings",
		columns: [
			{ name: "isPlenarySelectionOpen", type: "bool" },
			{ name: "active", type: "bool", unique: true }
		]
	}
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Attendees = InferredTypes["attendees"];
export type AttendeesRecord = Attendees & XataRecord;

export type AuthAccounts = InferredTypes["auth_accounts"];
export type AuthAccountsRecord = AuthAccounts & XataRecord;

export type AuthVerificationTokens = InferredTypes["auth_verification_tokens"];
export type AuthVerificationTokensRecord = AuthVerificationTokens & XataRecord;

export type AuthUsersAccounts = InferredTypes["auth_users_accounts"];
export type AuthUsersAccountsRecord = AuthUsersAccounts & XataRecord;

export type AuthUsersSessions = InferredTypes["auth_users_sessions"];
export type AuthUsersSessionsRecord = AuthUsersSessions & XataRecord;

export type AuthSessions = InferredTypes["auth_sessions"];
export type AuthSessionsRecord = AuthSessions & XataRecord;

export type PartnerSchools = InferredTypes["partner_schools"];
export type PartnerSchoolsRecord = PartnerSchools & XataRecord;

export type Plenaries = InferredTypes["plenaries"];
export type PlenariesRecord = Plenaries & XataRecord;

export type AttendeesPlenaries = InferredTypes["attendees_plenaries"];
export type AttendeesPlenariesRecord = AttendeesPlenaries & XataRecord;

export type ScheduleSlots = InferredTypes["schedule_slots"];
export type ScheduleSlotsRecord = ScheduleSlots & XataRecord;

export type FrequentlyAskedQuestions =
	InferredTypes["frequently_asked_questions"];
export type FrequentlyAskedQuestionsRecord = FrequentlyAskedQuestions &
	XataRecord;

export type FrequentlyAskedQuestionsCategories =
	InferredTypes["frequently_asked_questions_categories"];
export type FrequentlyAskedQuestionsCategoriesRecord =
	FrequentlyAskedQuestionsCategories & XataRecord;

export type AdministrationUsers = InferredTypes["administration_users"];
export type AdministrationUsersRecord = AdministrationUsers & XataRecord;

export type AdministrationSessions = InferredTypes["administration_sessions"];
export type AdministrationSessionsRecord = AdministrationSessions & XataRecord;

export type AdministrationVerificationTokens =
	InferredTypes["administration_verification_tokens"];
export type AdministrationVerificationTokensRecord =
	AdministrationVerificationTokens & XataRecord;

export type GeneralSettings = InferredTypes["general_settings"];
export type GeneralSettingsRecord = GeneralSettings & XataRecord;

export type DatabaseSchema = {
	attendees: AttendeesRecord;
	auth_accounts: AuthAccountsRecord;
	auth_verification_tokens: AuthVerificationTokensRecord;
	auth_users_accounts: AuthUsersAccountsRecord;
	auth_users_sessions: AuthUsersSessionsRecord;
	auth_sessions: AuthSessionsRecord;
	partner_schools: PartnerSchoolsRecord;
	plenaries: PlenariesRecord;
	attendees_plenaries: AttendeesPlenariesRecord;
	schedule_slots: ScheduleSlotsRecord;
	frequently_asked_questions: FrequentlyAskedQuestionsRecord;
	frequently_asked_questions_categories: FrequentlyAskedQuestionsCategoriesRecord;
	administration_users: AdministrationUsersRecord;
	administration_sessions: AdministrationSessionsRecord;
	administration_verification_tokens: AdministrationVerificationTokensRecord;
	general_settings: GeneralSettingsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
	databaseURL:
		"https://World-Affairs-Conference-4ipo7i.us-east-1.xata.sh/db/wac"
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
	constructor(options?: BaseClientOptions) {
		super({ ...defaultOptions, ...options }, tables);
	}
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
	if (instance) return instance;

	instance = new XataClient();
	return instance;
};
