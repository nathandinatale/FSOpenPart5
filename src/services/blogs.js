import axios from "axios";
const baseUrl = "/api/blogs";

const setAuth = (token) => {
  const authHeader = `Bearer ${token}`;
  return {
    headers: { Authorization: authHeader },
  };
};

const getAll = async (token) => {
  const response = await axios.get(baseUrl, setAuth(token));
  return response.data;
};

// seperate get request to fetch all blogs because back-end does not have fetching individual blog implemented
// the post request returns the blog object without the populated user field
// ideally would either call a get to blogs/:id route or change the post function to populate user on return
// implemented this way since intent of exercise is to fix it by changes from the frontend
const create = async (newBlog, token) => {
  const createdBlog = (await axios.post(baseUrl, newBlog, setAuth(token))).data;
  const blogs = (await axios.get(baseUrl, setAuth(token))).data;
  const populatedBlog = blogs.find((blog) => blog.id === createdBlog.id);
  return populatedBlog;
};

// For this scenario, just changed the post route handler on backend to return fulfilled user prop
const likeBlog = async (blog, token) => {
  const { title, author, id, likes, url } = blog;
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { title, author, id, url, likes: likes + 1 },
    setAuth(token)
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, likeBlog };
