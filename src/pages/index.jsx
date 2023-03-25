import React from "react";
import Layout from "../components/Layout";
import GitHub from "../components/GitHub";
import Spotify from "../components/Spotify";
import Strava from "../components/Strava";
import Pinterest from "../components/Pinterest";
import styles from "./index.module.scss";

const Home = (props) => (
  <Layout
    title="Hello!"
    subtitle={
      <p>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
    {...props}
  >
    <div className={styles.embeds}>
      <div>
        <Spotify />
        <Strava />
        <GitHub />
        <Pinterest />
      </div>
    </div>
  </Layout>
);

export default Home;
