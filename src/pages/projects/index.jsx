import React from "react";
import Layout from "../../components/Layout";
import "../../style/Projects.scss";

const Projects = () => (
  <Layout title="Projects" className="projects">
    <ul>
      <li>
        <a href="/covid19worldmap">Covid-19 World Map</a>
      </li>
      <li>
        <a href="/projects/dots">Dots</a>
      </li>
      <li>
        <a href="/projects/diagonals">Diagonals</a>
      </li>
    </ul>
  </Layout>
);

export default Projects;
