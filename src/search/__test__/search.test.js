import React from "react";
import Search from "../search";
import axiosMock from "../../__mocks__/axios";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

const [users, repositories] = [
    `https://api.github.com/search/repositories?q=foo&per_page=25&page=1`,
    `https://api.github.com/search/repositories?q=foo&per_page=25&page=1`
];

const usersResponse = {
    data: {
        "total_count": 1,
        "items": [
            { "id": 0, "login": "a", "html_url": "https://github.com" }
        ]
    }
};

const reposResponse = {
    data: {
        "total_count": 1,
        "items": [
            { "id": 1, "name": "b", "html_url": "https://github.com" }
        ]
    }
};

test("Search component renders correctly without initial value and the input is focused", () => {
    render(<Search />);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
});

test("fetch data when user inputs 'foo' with keyboard", async () => {
    const user = userEvent.setup();
    render(<Search debounce={false} />);

    axiosMock.get.mockImplementation((url) => {
        if (url === users) {
            Promise.resolve(usersResponse);
        } else if (url === repositories) {
            Promise.resolve(reposResponse);
        }
    });

    axiosMock.all.mockResolvedValue([usersResponse, reposResponse]);

    await user.keyboard("foo");
    expect(axiosMock.get).toHaveBeenCalledWith(users);
    expect(axiosMock.get).toHaveBeenCalledWith(repositories);

});