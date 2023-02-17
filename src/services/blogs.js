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

const create = async (newBlog, token) => {
  const response = await axios.post(baseUrl, newBlog, setAuth(token));
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
