import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "../../style/MoreDots.scss";

const MoreDots = () => {
  const [bodyHeight, setBodyHeight] = useState();
  const [bodyWidth, setBodyWidth] = useState();

  useEffect(() => {
    const body = document.querySelector("body");
    setBodyHeight(body.clientHeight);
    setBodyWidth(body.clientWidth);
  }, []);

  const Dot = () => {
    const size = Math.round(Math.random() * 10) + 5;
    return (
      <div
        className="dot"
        style={{
          top: `${Math.round(Math.random() * bodyHeight * 2)}px`,
          left: `${Math.round(Math.random() * bodyWidth)}px`,
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    );
  };

  return (
    <Layout className="more-dots" title="More Dots">
      {Array(400)
        .fill(0)
        .map((item, index) => (
          <Dot key={index} />
        ))}
    </Layout>
  );
};

export default MoreDots;
