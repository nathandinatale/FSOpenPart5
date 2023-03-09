import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Blog from "../components/Blog";

const handleLike = jest.fn();
const handleRemoveBlog = jest.fn();

beforeEach(() => {
  const blog = {
    author: "Sheldon Keefe",
    title: "Why do we have 9 defencemen",
    likes: 5,
    url: "leafs.ca",
    user: "63f39ffb778573fcd8c1118b",
  };

  render(
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleRemoveBlog={handleRemoveBlog}
      username={"GoLeafsGo97"}
    />
  );
});

test("renders title and author but not URL or likes", async () => {
  const renderedTitle = screen.getByText("Why do we have 9 defencemen", {
    exact: false,
  });
  expect(renderedTitle).toBeInTheDocument();

  const renderedAuthor = screen.getByText("Sheldon Keefe", { exact: false });
  expect(renderedAuthor).toBeInTheDocument();

  const renderedLikes = screen.queryByText("likes", { exact: false });
  expect(renderedLikes).toBeNull();

  const renderedURL = screen.queryByText("leafs.ca", { exact: false });
  expect(renderedURL).toBeNull();

  // const button = screen.getByText("like");
  // await user.click(button);

  // expect(handleLike.mock.calls).toHaveLength(1);
  // screen.debug(element);
});

test("renders likes and URL after the show button is pressed ", async () => {
  const user = userEvent.setup();

  const showButton = screen.getByText("show");
  await user.click(showButton);

  const renderedLikes = screen.queryByText("likes", { exact: false });
  expect(renderedLikes).toBeInTheDocument();

  const renderedURL = screen.queryByText("leafs.ca", { exact: false });
  expect(renderedURL).toBeInTheDocument();
});

test("pressing like button calls the event handler each time", async () => {
  const user = userEvent.setup();

  const showButton = screen.getByText("show");
  await user.click(showButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);

  expect(handleLike.mock.calls).toHaveLength(1);

  await user.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(2);
});
