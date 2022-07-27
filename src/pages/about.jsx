import React from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const About = (props) => (
  <Layout
    title="About"
    className="about"
    subtitle={
      <p>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
    {...props}
  >
    <Helmet>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
    </Helmet>
    <div className="embeds-wrapper">
      <div className="embeds">
        <div className="twitter-embed">
          <a
            class="twitter-timeline"
            target="_blank"
            href="https://twitter.com/paigevogie?ref_src=twsrc%5Etfw"
          >
            Tweets by paigevogie
          </a>
        </div>
        <iframe
          title="Spotify Playlist"
          className="spotify-embed"
          src="https://open.spotify.com/embed/playlist/3eZXX8QCpHVxWgUypND5Lb?utm_source=generator"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <iframe
          title="Strava Runs"
          className="strava-embed"
          src="https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df"
          frameBorder="0"
          scrolling="yes"
        ></iframe>
        <div className="pinterest-embed-sm">
          <a
            data-pin-do="embedUser"
            data-pin-board-width="180"
            data-pin-scale-height="90"
            data-pin-scale-width="70"
            target="_blank"
            href="https://www.pinterest.com/paigevogie/"
          ></a>
        </div>
        <div className="pinterest-embed-lg">
          <a
            data-pin-do="embedUser"
            data-pin-board-width="325"
            data-pin-scale-height="240"
            data-pin-scale-width="60"
            target="_blank"
            href="https://www.pinterest.com/paigevogie/"
          ></a>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
