import React from "react";
import Moment from "moment";

import Layout from "../../components/Layout";
import { useStaticQuery, graphql } from "gatsby";

const Blog = (props) => {
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
    <Layout title="Blog" className="blog" {...props}>
      <ul>
        {query.allMdx.edges.map(({ node }) => {
          if (!node?.slug || !node?.frontmatter?.title) return;

          return (
            <li>
              <a href={"/blog/" + node.slug}>
                <p>{node.frontmatter.title}</p>
                {!!node?.frontmatter?.date && !!node?.timeToRead && (
                  <small>
                    {Moment.utc(node.frontmatter.date).format("ll")} |{" "}
                    {node.timeToRead} min read
                  </small>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
