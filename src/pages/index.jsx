import React from "react";
import Layout from "../components/Layout";
import GitHub from "../components/GitHub";
import Strava from "../components/Strava";
import Pinterest from "../components/Pinterest";
import Libby from "../components/Libby";
import styles from "./index.module.scss";
import { getGithubData, getStravaData, getLibbyData } from "../service";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  const fs = require("fs");
  return {
    props: {
      githubData: await getGithubData(),
      libbyData: await getLibbyData(),
      // stravaData: await getStravaData(),
      // stravaData: JSON.parse(fs.readFileSync("./data/stravaActivities.json")),
    },
  };
}

const Home = ({ githubData, stravaData, libbyData, ...props }) => (
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
        <Strava {...{ stravaData }} />
        <Libby {...{ libbyData }} />
        <GitHub {...{ githubData }} />
        <Pinterest />
      </div>
    </div>
  </Layout>
);

export default Home;
