import { useState } from "react";

import blogService from "../services/blogs";

const BlogForm = ({ setNotification, setBlogs, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [showForm, setShowForm] = useState(false);

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.create(
        { title, author, url },
        user.token
      );
      // update the state by concatenating the new blog, or fetching blogs from backend?
      setBlogs((blogs) => blogs.concat(createdBlog));
      setNotification({
        color: "green",
        message: `${createdBlog.title} by ${createdBlog.author} added`,
      });
      setTimeout(() => setNotification({ color: "", message: "" }), 5000);
      setShowForm(false);
    } catch (exception) {
      setNotification({
        color: "red",
        message: exception.response?.data?.error,
      });
      setTimeout(() => setNotification({ color: "", message: "" }), 5000);
    }
  };

  return (
    <>
      {showForm && (
        <div>
          <h2>create new</h2>
          <form onSubmit={handleAddBlog}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create new</button>
          </form>
        </div>
      )}
      <div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "cancel" : "create new blog"}
        </button>
      </div>
    </>
  );
};

export default BlogForm;
