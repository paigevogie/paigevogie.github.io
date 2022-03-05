import React from "react";
import Layout from "../components/Layout";

const Home = () => (
  <Layout
    title="Paige Vogie"
    className="home"
    subtitle={
      <p>
        Hello!{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
        Welcome to my site.
      </p>
    }
  />
);

export default Home;
