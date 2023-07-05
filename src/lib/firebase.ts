import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, onAuthStateChanged } from 'firebase/auth';
import { connectFirestoreEmulator, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { derived, type Readable, readable } from 'svelte/store';
import type { z } from 'zod';

import { browser } from '$app/environment';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
	PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public';
import type { ZodCatchObject, ZodStrictObject } from '$lib/schemas/types';
import { User, UserParse } from '$lib/schemas/User';
import { mode } from '$lib/utils';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
if (mode === 'dev' || mode === 'test') {
	const [firestoreHostname, firestorePort] = PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST.split(':');
	if (!firestoreHostname || !firestorePort)
		throw new Error('Invalid PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST');
	try {
		connectFirestoreEmulator(db, firestoreHostname, +firestorePort);
		connectAuthEmulator(auth, `http://${PUBLIC_FIREBASE_AUTH_EMULATOR_HOST}`, {
			disableWarnings: true
		});
	} catch (error) {
		if (!(error instanceof Error) || !/already been started/u.test(error.message)) throw error;
	}
}

/**
 * Client only
 */
export const user = readable(auth.currentUser, (set) =>
	browser ? onAuthStateChanged(auth, (user) => set(user)) : set(null)
);

/**
 * Client only
 */
export function docStore<
	T extends ZodStrictObject,
	U extends z.infer<T> extends z.infer<U> ? ZodCatchObject<T> : never
>(path: string, schema: T, parsingSchema: U) {
	const docRef = doc(db, path);

	const { subscribe } = readable<(z.infer<T> & { invalid: false | z.ZodError }) | null>(
		null,
		(set) =>
			browser
				? onSnapshot(docRef, (snapshot) => {
						try {
							if (!snapshot.exists()) set(null);
							else {
								const data = snapshot.data();
								const valid = schema.safeParse(data);
								const parsed = parsingSchema.parse(data);
								set({
									...parsed,
									invalid: valid.success ? false : valid.error
								});
							}
						} catch (error) {
							console.error(error);
							set(null);
						}
				  })
				: set(null)
	);

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

/**
 * Client only
 */
export const userData: Readable<User | null> = derived(user, ($user, set) => {
	if ($user) return docStore(`users/${$user.uid}`, User, UserParse).subscribe(set);
	else set(null);
});
