import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle
        titleTemplate
        defaultDescription
        siteUrl: url
      }
    }
  }
`;

const SEO = ({ title, description, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
        },
      },
    }) => {

      return (
          <Helmet titleTemplate={titleTemplate}>
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
          </Helmet>
      )
    }}
  />
);

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

export default SEO;
