import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [expandedView, setExpandedView] = useState(false);

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setExpandedView(!expandedView)}>
          {expandedView ? "hide" : "show"}
        </button>
      </p>
      {expandedView && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
