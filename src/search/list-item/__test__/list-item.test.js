import React from "react";
import ListItem from "../list-item";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("ListItem component renders with the right props", async () => {
    const user = userEvent.setup();
    render(<ListItem data={{ name: "test-name", type: "test-type", url: "https://github.com/" }} index={0} pageIndex={0} />);
    const name = screen.getByTestId('name');
    const type = screen.getByTestId('type');
    const index = screen.getByTestId('index');
    const link = screen.getByTestId('link');
    expect(name.textContent).toBe('test-name');
    expect(type.textContent).toBe('test-type');
    expect(index.textContent).toBe('1');
    expect(link).toHaveAttribute('href', 'https://github.com/');
    expect(link).toHaveAttribute('target', '_blank');
    await user.click(link);
    expect(link).toHaveFocus();
});

