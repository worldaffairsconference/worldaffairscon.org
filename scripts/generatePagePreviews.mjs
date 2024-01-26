#!/usr/bin/env node

import createManifestData from "@sveltejs/kit/create_manifest_data";
import { load_config } from "@sveltejs/kit/config";
import ts from "typescript";
import puppeteer from "puppeteer";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function shouldPreviewPage(fileName) {
	const program = ts.createProgram([fileName], {});
	const checker = program.getTypeChecker();
	const sourceFileSymbol = checker.getSymbolAtLocation(
		program.getSourceFile(fileName)
	);
	const exports = Object.fromEntries(
		checker
			.getExportsOfModule(sourceFileSymbol)
			.map((obj) => [obj.name, obj.valueDeclaration.getLastToken().kind])
	);
	return exports._renderPagePreview === ts.SyntaxKind.TrueKeyword;
}

const pagesToRender = createManifestData({
	config: await load_config({ cwd: path.join(__dirname, "..") })
})
	.routes.filter((r) =>
		r.leaf?.universal ? shouldPreviewPage(r.leaf.universal) : false
	)
	.map((r) => r.id.replace(/\(.*?\)\/?/g, ""))
	.map((r) => ({ name: `page-preview${r.replaceAll("/", "-")}`, url: r }));

const browser = await puppeteer.launch({
	headless: "new",
	defaultViewport: { width: 1536, height: 822 }
});

for (const { name, url } of pagesToRender) {
	const page = await browser.newPage();
	await page.goto(`http://localhost:5173${url}`);
	await page.addStyleTag({ content: "* { overflow: hidden; }" });
	await page.waitForNetworkIdle();
	await page.screenshot({
		path: path.join(
			__dirname,
			"..",
			"static",
			"page-previews",
			`${name}.png`
		)
	});
	await page.close();
}

await browser.close();
