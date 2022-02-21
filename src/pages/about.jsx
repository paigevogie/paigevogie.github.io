import React from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import "../style/About.scss";

const About = () => (
  <Layout
    title="About"
    className="about"
    subtitle={
      <p>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
  >
    <Helmet>
      <script
        src="https://platform.linkedin.com/badges/js/profile.js"
        async
        defer
        type="text/javascript"
      ></script>
    </Helmet>
    <div className="iframes">
      <iframe
        title="Spotify Playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1EUMDoJuT8yJsl?utm_source=generator"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <iframe
        title="Strava Runs"
        src="https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="paigevogie"
        data-version="v1"
      ></div>
    </div>
  </Layout>
);

export default About;
