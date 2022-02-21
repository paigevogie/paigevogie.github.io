import React from "react";
import Layout from "../../components/Layout";
import "../../style/Blog.scss";

const Blog = () => (
  <Layout title="Blog" className="blog">
    <ul>
      <li>
        <a href="/blog/managers-readme">Manager's README</a>
      </li>
    </ul>
  </Layout>
);

export default Blog;
