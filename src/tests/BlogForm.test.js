import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import BlogForm from "../components/BlogForm";
import blogService from "../services/blogs";

test("<BlogForm />  calls the event handler to create a new blog correctly", async () => {
  const setNotification = jest.fn();
  const setBlogs = jest.fn();

  const user = userEvent.setup();

  const appUser = { token: "myToken" };

  const testBlog = {
    author: "Luke Schenn",
    title: "Why is Boston still so good",
    url: "leafs.ca",
    likes: 0,
  };

  // The handler function is defined in the component itself, won't be executed unless this resolves
  blogService.create = jest.fn().mockResolvedValue(testBlog);

  render(
    <BlogForm
      setNotification={setNotification}
      setBlogs={setBlogs}
      user={appUser}
    />
  );

  const showButton = screen.getByText("create new blog");
  await user.click(showButton);

  const titleInput = screen.getByLabelText("Title");
  const authorInput = screen.getByLabelText("Author");
  const urlInput = screen.getByLabelText("URL");

  const submitButton = screen.getByRole("button", { name: "create new" });

  await user.type(titleInput, "Why are the LEAFS still so good");
  await user.type(authorInput, testBlog.author);
  await user.type(urlInput, testBlog.url);

  await user.click(submitButton);

  expect(setBlogs.mock.calls).toHaveLength(1);

  // checking that the blog provided by user is received by the handler
  expect(blogService.create.mock.calls[0][0]).toMatchObject({
    title: "Why are the LEAFS still so good",
    author: testBlog.author,
    url: testBlog.url,
  });
});
