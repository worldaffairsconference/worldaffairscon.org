import { faker } from "@faker-js/faker";
import {
	assertFails,
	assertSucceeds,
	initializeTestEnvironment
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import fs from "fs/promises";

const testEnv = await initializeTestEnvironment({
	projectId: JSON.parse((await fs.readFile(".firebaserc")).toString())
		.projects.test,
	firestore: {
		rules: await fs.readFile("firebase/firestore.rules", "utf8"),
		host: "127.0.0.1",
		port: JSON.parse((await fs.readFile("firebase.json")).toString())
			.emulators.firestore.port
	}
});

const name = faker.person.firstName().toLowerCase();

afterAll(async () => {
	await testEnv.cleanup();
	await fs.mkdir("reports", { recursive: true });
	if (!testEnv.emulators.firestore) return;
	const { host, port } = testEnv.emulators.firestore;
	const quotedHost = host.includes(":") ? `[${host}]` : host;
	await fetch(
		`http://${quotedHost}:${port}/emulator/v1/projects/${testEnv.projectId}:ruleCoverage.html`
	)
		.then((res) => res.text())
		.then((res) => fs.writeFile("reports/firestore-coverage.html", res));
});

beforeEach(async () => {
	await testEnv.withSecurityRulesDisabled(async (context) => {
		const firestore = context.firestore();
		await setDoc(doc(firestore, `/users/${name}`), { test: true, name });
	});
});

afterEach(async () => {
	await testEnv.clearFirestore();
});

describe("this is a test", () => {
	it("should fail", async () => {
		const alice = testEnv.authenticatedContext(name, {});
		await assertFails(getDoc(doc(alice.firestore(), `/users/${name}`)));
	});
	it("should succeed", async () => {
		const owner = testEnv.authenticatedContext("owner", {});
		const firestore = owner.firestore();
		await assertSucceeds(getDoc(doc(firestore, `/users/${name}`)));
	});
});
