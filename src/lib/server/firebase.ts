import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import {
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY
} from "$env/static/private";
import {
	PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
	PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST,
	PUBLIC_FIREBASE_PROJECT_ID
} from "$env/static/public";
import { mode } from "$lib/utils";

if (mode === "dev" || mode === "test") {
	process.env["FIREBASE_AUTH_EMULATOR_HOST"] =
		PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
	process.env["FIRESTORE_EMULATOR_HOST"] =
		PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST;
}

try {
	initializeApp({
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		credential: cert({
			projectId: PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_CLIENT_EMAIL,
			privateKey: JSON.parse(FIREBASE_PRIVATE_KEY)
		})
	});
} catch (error) {
	if (!(error instanceof Error) || !/already exists/u.test(error.message))
		throw error;
}

export const adminDb = getFirestore();
