import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

const ListItem = ({ href, title, description }) => (
  <li>
    <Link href={href}>
      <p>{title}</p>
      <small>{description}</small>
    </Link>
  </li>
);

const Projects = (props) => (
  <Layout title="Projects." className="projects" {...props}>
    <ul>
      <ListItem
        href="/projects/covid19worldmap"
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
      {/* <ListItem
        href="/projects/birds"
        title="Birds"
        description="Tweet"
      /> */}
      <ListItem
        href="https://garmin.paigevogie.com"
        title="Garmin"
        description="Todo"
      />
      <ListItem
        href="/projects/blackandwhite"
        title="Black and White"
        description="Todo"
      />
    </ul>
  </Layout>
);

export default Projects;
