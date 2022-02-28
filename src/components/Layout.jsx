import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";

import Footer from "./Footer";
import Nav from "./Nav";
import SEO from "./SEO";
import "../style/Layout.scss";

const Layout = ({
  title,
  subtitle,
  description,
  children,
  className,
  pageContext,
  path = "",
}) => {
  const blogTitle = pageContext?.frontmatter?.title;
  const blogDescription = pageContext?.frontmatter?.description;
  const blogSubtitle = pageContext?.frontmatter?.subtitle;
  const blogDate = pageContext?.frontmatter?.date;

  const Content = () => (
    <>
      <header>
        {!!(blogTitle || title) && <h1>{blogTitle || title}.</h1>}
        {!!(subtitle || blogSubtitle) && <>{subtitle || blogSubtitle}</>}
        {!!blogDate && <p>{Moment.utc(blogDate).format("ll")}</p>}
      </header>
      {children}
    </>
  );

  return (
    <>
      <SEO
        title={blogTitle || title}
        description={blogDescription || description}
      />
      <Nav />
      <main className={className}>
        {!!path.match(/\/blog\/[A-Za-z-]*\/?/) ? (
          <article>
            <Content />
          </article>
        ) : (
          <Content />
        )}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  description: PropTypes.string,
};

export default Layout;
