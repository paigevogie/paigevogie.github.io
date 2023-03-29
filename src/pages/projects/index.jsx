import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "./index.module.scss";

const ListItem = ({ href, title, description }) => (
  <li>
    <Link href={href}>
      <p>{title}</p>
      <small>{description}</small>
    </Link>
  </li>
);

const Projects = (props) => (
  <Layout className={styles.projects} title="Projects." {...props}>
    <ul>
      <ListItem
        href="/projects/bubbles"
        title="Bubbles"
        description="Fun with randomness"
      />
      <ListItem
        href="/projects/covid19-world-map"
        title="Covid-19 World Map"
        description="D3 visualizations"
      />
      <ListItem
        href="/projects/dots"
        title="Dots"
        description="CSS animations"
      />
      {/* <ListItem
        href="https://garmin.paigevogie.com"
        title="Garmin"
        description="Fitness data"
      /> */}
    </ul>
  </Layout>
);

export default Projects;
