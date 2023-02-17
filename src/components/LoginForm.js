import { useState } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({ setUser, setNotification, setBlogs }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login(username, password);
      setUser(loggedInUser);
      setPassword("");
      setUsername("");
      window.localStorage.setItem("user", JSON.stringify(loggedInUser));

      const fetchedBlogs = await blogService.getAll(loggedInUser.token);
      setBlogs(fetchedBlogs);
      setNotification({
        color: "green",
        message: `User ${loggedInUser.name} successfuly logged in`,
      });
      setTimeout(() => setNotification({ color: "", message: "" }), 5000);
    } catch (exception) {
      setNotification({
        color: "red",
        message: exception.response?.data?.error,
      });
      setTimeout(() => setNotification({ color: "", message: "" }), 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
