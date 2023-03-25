import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import SEO from "../SEO";
import styles from "./index.module.scss";

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
    <header className={styles.header}>
      <Nav />
      <div>
        <h1>{title}</h1>
        {subtitle}
      </div>
    </header>
    <main className={`${styles.main} ${className ? className : ""}`}>
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
