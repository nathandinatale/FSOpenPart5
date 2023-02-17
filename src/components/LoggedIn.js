const LoggedIn = ({ user, setUser, setBlogs }) => {
  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    setUser(null);
    setBlogs([]);
  };

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {`${user.name} logged in `}
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
};

export default LoggedIn;
