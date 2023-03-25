import React from "react";
import Layout from "../components/Layout";

const FourZeroFour = (props) => (
  <Layout
    title="404 :("
    subtitle={
      <p>
        Sorry, this page doesn't exist. Please head back to the{" "}
        <a href="/">homepage</a>.
      </p>
    }
    {...props}
  />
);

export default FourZeroFour;
