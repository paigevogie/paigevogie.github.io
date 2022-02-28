import React from "react";
import Moment from "moment";

import Layout from "../../components/Layout";
import "../../style/Blog.scss";
import { useStaticQuery, graphql } from "gatsby";

const Blog = () => {
  const query = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { slug: { regex: "/blog/[A-Za-z-]*/?/" } }) {
          edges {
            node {
              slug
              frontmatter {
                title
                date
              }
              timeToRead
            }
          }
        }
      }
    `
  );

  return (
    <Layout title="Blog" className="blog">
      <ul>
        {query.allMdx.edges.map(({ node }) => {
          if (!node?.slug || !node?.frontmatter?.title) return;

          return (
            <li>
              {!!node?.frontmatter?.date && !!node?.timeToRead && (
                <p>
                  <small>
                    {Moment.utc(node.frontmatter.date).format("ll")} |{" "}
                    {node.timeToRead} min
                  </small>
                </p>
              )}
              <a href={"/" + node.slug}>{node.frontmatter.title}</a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
