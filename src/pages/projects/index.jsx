import React from "react";
import Layout from "../../components/Layout";
import "../../style/Projects.scss";

const Projects = () => (
  <Layout title="Projects" className="projects">
    <ul>
      <li>
        <a href="/covid19worldmap">Covid-19 World Map</a>
        <p>
          <small>D3 visualizations</small>
        </p>
      </li>
      <li>
        <a href="/projects/dots">Dots</a>
        <p>
          <small>CSS animations</small>
        </p>
      </li>
      <li>
        <a href="/projects/diagonals">Diagonals</a>
        <p>
          <small>CSS transforms</small>
        </p>
      </li>
      <li>
        <a href="/projects/more-dots">More Dots</a>
        <p>
          <small>Fun with randomness</small>
        </p>
      </li>
    </ul>
  </Layout>
);

export default Projects;
