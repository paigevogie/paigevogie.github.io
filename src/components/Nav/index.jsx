import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";

class Nav extends React.Component {
  state = {
    pathname: "/",
  };

  componentDidMount() {
    // required for ssr
    typeof window !== `undefined` &&
      this.setState({ pathname: window.location.pathname });
  }

  getClassName = (path) => (this.state.pathname.includes(path) ? "active" : "");

  render() {
    const { getClassName, state } = this;
    const { pathname } = state;

    return (
      <nav className={styles.nav}>
        <Link href="/" className={pathname === "/" ? "active home" : "home"}>
          Home
        </Link>
        <Link href="/projects/" className={getClassName("projects")}>
          Projects
        </Link>
      </nav>
    );
  }
}

export default Nav;
