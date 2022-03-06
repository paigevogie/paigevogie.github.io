import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description, path }) => {
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle
            titleTemplate
            defaultDescription
            siteURL
          }
        }
      }
    `
  );

  const { defaultTitle, titleTemplate, defaultDescription, siteURL } =
    query.site.siteMetadata;

  return (
    <Helmet
      title={title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
      htmlAttributes={{ lang: "en" }}
      meta={[
        {
          name: "description",
          content: description || defaultDescription,
        },
        {
          name: "robots",
          content: "index, follow",
        },
      ]}
      link={[
        {
          rel: "canonical",
          href: `${siteURL}${path}`,
        },
      ]}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
};

export default SEO;
