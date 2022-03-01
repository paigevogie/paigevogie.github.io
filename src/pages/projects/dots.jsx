import React from "react";
import Layout from "../../components/Layout";
import "../../style/Dots.scss";

const Ring = () => <div className="ring"></div>;

const Dots = () => (
  <Layout className="dots" title="Dots">
    <div className="rings">
      {Array(12)
        .fill(0)
        .map((item, index) => (
          <Ring key={index} />
        ))}
    </div>
  </Layout>
);

export default Dots;
