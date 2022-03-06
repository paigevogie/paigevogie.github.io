import React from "react";
import Moment from "moment";
import Layout from "../../components/Layout";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default ({ data, ...props }) => {
  if (!data?.mdx?.body || !data?.mdx?.frontmatter) return;
  const { body, frontmatter, timeToRead } = data.mdx;
  const { date, title } = frontmatter;

  return (
    <Layout
      isArticle
      title={title}
      subtitle={
        <small>
          {Moment.utc(date).format("ll")} | {timeToRead} min read
        </small>
      }
      {...props}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      slug
      timeToRead
      frontmatter {
        date
        title
      }
    }
  }
`;
