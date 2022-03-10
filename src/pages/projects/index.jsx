import React from "react";
import Layout from "../../components/Layout";

const Projects = (props) => (
  <Layout title="Projects" className="projects" {...props}>
    <ul>
      <li>
        <a href="/projects/covid19worldmap">
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
        <a href="/projects/bubbles">
          <p>Bubbles</p>
          <small>Fun with randomness</small>
        </a>
      </li>
      {/*<li>
        <a href="/projects/birds">
          <p>Birds</p>
          <small>Tweet</small>
        </a>
      </li>*/}
    </ul>
  </Layout>
);

export default Projects;
