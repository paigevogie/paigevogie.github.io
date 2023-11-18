import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

const Nav = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link
        href="/projects"
        className={pathname.includes("projects") ? "active" : ""}
      >
        Projects
      </Link>
    </nav>
  );
};

export default Nav;
