import React from "react";
import Layout from "../../components/Layout";

const Birds = (props) => {
  return (
    <Layout title="Birds" {...props}>
      <div className="birds">
        <div className="bird">
          <div className="left-wing"></div>
          <div className="right-wing"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Birds;
