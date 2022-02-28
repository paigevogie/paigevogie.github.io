import React from "react";
import Moment from "moment";

import Layout from "../../components/Layout";
import "../../style/Blog.scss";
import { useStaticQuery, graphql } from "gatsby";

const Blog = () => {
  const query = useStaticQuery(
    graphql`
      query {
        allMdx {
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
              <a href={"/blog/" + node.slug}>{node.frontmatter.title}</a>
              {!!node?.frontmatter?.date && !!node?.timeToRead && (
                <p>
                  <small>
                    {Moment.utc(node.frontmatter.date).format("ll")} |{" "}
                    {node.timeToRead} min read
                  </small>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
