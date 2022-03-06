import React from "react";
import PropTypes from "prop-types";

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
  path,
}) => {
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <>
      <SEO
        title={title !== "Paige Vogie" ? title : null}
        description={description}
        path={path}
      />
      <Nav />
      <main className={className}>
        <ConditionalWrapper
          condition={!!path.match(/\/blog\/[a-z-]*\//)}
          wrapper={(children) => <article>{children}</article>}
        >
          <header>
            <h1>{title}.</h1>
            {subtitle}
          </header>
          {children}
        </ConditionalWrapper>
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
