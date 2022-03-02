import React from "react";
import Layout from "../../components/Layout";
import "../../style/Projects.scss";

const Projects = () => (
  <Layout title="Projects" className="projects">
    <ul>
      <li>
        <a href="/covid19worldmap">
          <p>Covid-19 World Map</p>
          <small>D3 visualizations</small>
        </a>
      </li>
      <li>
        <a href="/projects/dots">
          <p>Dots</p>
          <small>CSS animations</small>
        </a>
      </li>
      <li>
        <a href="/projects/diagonals">
          <p>Diagonals</p>
          <small>CSS transforms</small>
        </a>
      </li>
      <li>
        <a href="/projects/more-dots">
          <p>More Dots</p>
          <small>Fun with randomness</small>
        </a>
      </li>
    </ul>
  </Layout>
);

export default Projects;
