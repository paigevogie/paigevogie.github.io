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
          top: `${Math.floor(Math.random() * bodyHeight)}px`,
          left: `${Math.floor(Math.random() * bodyWidth)}px`,
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    );
  };

  return (
    <Layout title="More Dots">
      <div className="more-dots">
        {Array(500)
          .fill(0)
          .map((item, index) => (
            <Dot key={index} />
          ))}
        <div className="fish">
          <div className="body"></div>
          <div className="tail"></div>
        </div>
      </div>
    </Layout>
  );
};

export default MoreDots;
