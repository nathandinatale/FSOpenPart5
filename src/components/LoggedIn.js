import PropTypes from "prop-types";

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

LoggedIn.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default LoggedIn;
