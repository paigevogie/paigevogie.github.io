import React from "react";
import Layout from "../components/Layout";

const Home = () => (
  <Layout
    title="Home"
    className="home"
    subtitle={
      <p>
        Hello! I'm Paige.{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
        Welcome to my site.
      </p>
    }
  />
);

export default Home;
