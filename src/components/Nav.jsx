import React from "react";
import Link from "next/link";

class Nav extends React.Component {
  state = {
    pathname: "/",
  };

  componentDidMount() {
    // required for server side
    typeof window !== `undefined` &&
      this.setState({ pathname: window.location.pathname });
  }

  getClassName = (path) => (this.state.pathname.includes(path) ? "active" : "");

  render() {
    const { getClassName, state } = this;
    const { pathname } = state;

    return (
      <nav>
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
