import React from "react";
import Layout from "../components/Layout";

const FourZeroFour = () => (
  <Layout
    title="404"
    subtitle={
      <p>
        Sorry, this page doesn't exist. Head back to the{" "}
        <a href="/">homepage</a>.
      </p>
    }
  />
);

export default FourZeroFour;
