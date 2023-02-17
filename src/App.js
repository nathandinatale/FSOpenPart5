import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
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
        <NewBlogForm
          setNotification={setNotification}
          setBlogs={setBlogs}
          user={user}
        />
      )}
      {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
