import { fireEvent, render, screen } from "@testing-library/svelte";

import Component from "../lib/Component.svelte";

describe("Todo", () => {
	it("shows the todo text when rendered", async () => {
		render(Component);
		const button = screen.getByRole("button");
		expect(button).toBeVisible();
		expect(button.textContent).toBe("0");
		await fireEvent.click(button);
		expect(button.textContent).toBe("1");
	});
});
