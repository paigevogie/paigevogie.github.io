import React from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Nav from "./Nav";
import SEO from "./SEO";

const Layout = ({
  title,
  subtitle,
  description,
  children,
  className,
  path,
}) => (
  <>
    <SEO
      title={title !== "Paige Vogie" ? title : null}
      description={description}
      path={path}
    />
    <main className={className}>
      <header>
        <Nav />
        <div>
          <h1>{title}</h1>
          {subtitle}
        </div>
      </header>
      {children}
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  description: PropTypes.string,
};

export default Layout;
