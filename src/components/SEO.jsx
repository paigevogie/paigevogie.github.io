import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description }) => {
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle
            titleTemplate
            defaultDescription
          }
        }
      }
    `
  );

  const { defaultTitle, titleTemplate, defaultDescription } =
    query.site.siteMetadata;

  return (
    <Helmet titleTemplate={titleTemplate}>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SEO;
