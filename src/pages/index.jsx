import React from "react";
import Layout from "../components/Layout";
import GitHub from "../components/GitHub";
import Spotify from "../components/Spotify";
import Strava from "../components/Strava";
import Pinterest from "../components/Pinterest";

const Home = (props) => (
  <Layout
    title="Hello!"
    className="home"
    subtitle={
      <p>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
    {...props}
  >
    <div className="embeds-wrapper">
      <div className="embeds">
        <Spotify />
        <Strava />
        <GitHub />
        <Pinterest />
      </div>
    </div>
  </Layout>
);

export default Home;
