import React from 'react';
import PropTypes from "prop-types"

import Footer from './Footer';
import Nav from './Nav';
import SEO from './SEO';
import '../style/Layout.scss';

const Layout = ({ title, subtitle, description, children, className }) => (
    <>
        <SEO title={title} description={description} />
        <Nav />
        <main className={className}>
          <header>
            {!!title && <h1>{title}.</h1>}
            {!!subtitle && subtitle}
          </header>
          { children }
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
