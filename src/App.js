import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LoggedIn from "./components/LoggedIn";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  const [notification, setNotification] = useState({ color: "", message: "" });

  useEffect(() => {
    async function fetchData() {
      const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
      if (!loggedInUser) return;
      setUser(loggedInUser);

      const fetchedBlogs = await blogService.getAll(loggedInUser.token);
      setBlogs(fetchedBlogs);
    }
    fetchData();
  }, []);

  const handleLike = async (blog) => {
    const likedBlog = await blogService.likeBlog(blog, user.token);
    const updatedBlogs = blogs.map((blog) => {
      return blog.id === likedBlog.id ? likedBlog : blog;
    });
    setBlogs(updatedBlogs);
  };

  const handleRemoveBlog = async (removeBlog) => {
    if (
      window.confirm(`Remove blog ${removeBlog.title} by ${removeBlog.author}`)
    ) {
      await blogService.removeBlog(removeBlog.id, user.token);
      const updatedBlogs = blogs.filter((blog) => blog.id !== removeBlog.id);
      setBlogs(updatedBlogs);
      setNotification({
        color: "green",
        message: `${removeBlog.title} by ${removeBlog.author} was successfuly deleted!`,
      });
      setTimeout(() => setNotification({ color: "", message: "" }), 5000);
    }
  };

  return (
    <div>
      <Notification message={notification.message} color={notification.color} />
      {user ? (
        <LoggedIn user={user} setUser={setUser} setBlogs={setBlogs} />
      ) : (
        <LoginForm
          setUser={setUser}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
      )}
      {user && (
        <BlogForm
          setNotification={setNotification}
          setBlogs={setBlogs}
          user={user}
        />
      )}
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemoveBlog={handleRemoveBlog}
              username={user.username}
            />
          ))}
    </div>
  );
};

export default App;
