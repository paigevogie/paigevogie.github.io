import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const config = {
  defaultTitle: "Paige Vogie",
  titleTemplate: "%s | Paige Vogie",
  defaultDescription: "The portfolio and blog of Paige Vogie (@paigevogie).",
  siteURL: "https://paigevogie.com",
};

const SEO = ({ title, description, path }) => {
  return (
    // TODO
    // <Helmet
    //   title={title}
    //   titleTemplate={titleTemplate}
    //   defaultTitle={defaultTitle}
    //   htmlAttributes={{ lang: "en" }}
    //   meta={[
    //     {
    //       name: "description",
    //       content: description || defaultDescription,
    //     },
    //     {
    //       name: "robots",
    //       content: "index, follow",
    //     },
    //   ]}
    //   link={[
    //     {
    //       rel: "canonical",
    //       href: `${siteURL}${path}`,
    //     },
    //   ]}
    //   />
    <Head>
      <title>{title}</title>
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
};

export default SEO;
