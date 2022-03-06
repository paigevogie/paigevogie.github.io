import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "../../style/Bubbles.scss";

const Bubbles = (props) => {
  const [bodyHeight, setBodyHeight] = useState();
  const [bodyWidth, setBodyWidth] = useState();

  useEffect(() => {
    const body = document.querySelector("body");
    setBodyHeight(body.clientHeight);
    setBodyWidth(body.clientWidth);
  }, []);

  const Bubble = () => {
    const size = Math.round(Math.random() * 10) + 5;
    return (
      <div
        className="bubble"
        style={{
          top: `${Math.floor(Math.random() * bodyHeight)}px`,
          left: `${Math.floor(Math.random() * bodyWidth)}px`,
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    );
  };

  return (
    <Layout title="Bubbles" {...props}>
      <div className="bubbles">
        {Array(500)
          .fill(0)
          .map((item, index) => (
            <Bubble key={index} />
          ))}
        <div className="fish">
          <div className="body"></div>
          <div className="tail"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Bubbles;
