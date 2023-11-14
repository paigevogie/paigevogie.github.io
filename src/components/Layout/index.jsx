import React from "react";
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
  seoTitle,
}) => (
  <>
    <SEO
      title={!!seoTitle ? seoTitle : title}
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
  </>
);

export default Layout;
