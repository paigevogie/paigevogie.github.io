import React from "react";
import styles from "./index.module.scss";

const Strava = ({ stravaData }) => {
  return (
    <div className={styles["strava-embed"]}>
      <iframe
        title="Strava Runs"
        src="https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df"
        height="100%"
        width="100%"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default Strava;
