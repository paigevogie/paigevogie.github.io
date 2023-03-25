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
        href="/projects/covid19-world-map"
        title="Covid-19 World Map"
        description="D3 visualizations"
      />
      <ListItem
        href="/projects/dots"
        title="Dots"
        description="CSS animations"
      />
      <ListItem
        href="/projects/diagonals"
        title="Diagonals"
        description="CSS transforms"
      />
      <ListItem
        href="/projects/bubbles"
        title="Bubbles"
        description="Fun with randomness"
      />
      <ListItem
        href="https://garmin.paigevogie.com"
        title="Garmin"
        description="Fitness data"
      />
      {/* <ListItem
        href="/projects/birds"
        title="Birds"
        description="Tweet"
      /> */}
      {/* <ListItem
        href="/projects/blackandwhite"
        title="Black and White"
        description="Todo"
      /> */}
    </ul>
  </Layout>
);

export default Projects;
