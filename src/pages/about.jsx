import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

// Had to pull this into it's own component because set state was messing with the other emebeds :)
const LinkedIn = () => {
  const [showLinkedIn, setShowLinkedIn] = useState(true);
  // There's probably a better way to do this in react: https://reactjs.org/docs/error-boundaries.html
  useEffect(() => {
    window.addEventListener(
      "error",
      (event) => {
        /* If linkedin errors, safari is preventing cross-site tracking */
        if (!!event.target && event.target.src.includes("linkedin")) {
          setShowLinkedIn(false);
        }
      },
      { capture: true }
    );
  }, []);

  return (
    <>
      <Helmet>
        <script
          src="https://platform.linkedin.com/badges/js/profile.js"
          async
          defer
          type="text/javascript"
        ></script>
      </Helmet>
      {showLinkedIn ? (
        <div
          className="linkedin-embed badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="large"
          data-theme="light"
          data-type="HORIZONTAL"
          data-vanity="paigevogie"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/paigevogie"
          >
            Paige Vogie on LinkedIn.
          </a>
        </div>
      ) : null}
    </>
  );
};

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
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
    </Helmet>
    <div className="embeds-wrapper">
      <div className="embeds">
        {/* Spotify */}
        <iframe
          title="Spotify Playlist"
          className="spotify-embed"
          src="https://open.spotify.com/embed/playlist/3eZXX8QCpHVxWgUypND5Lb?utm_source=generator"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        {/* Strava */}
        <iframe
          title="Strava Runs"
          className="strava-embed"
          src="https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df"
          frameBorder="0"
          scrolling="yes"
        ></iframe>
        {/* Pinterest */}
        <div className="pinterest-embed-sm">
          <a
            data-pin-do="embedUser"
            data-pin-board-width="180"
            data-pin-scale-height="90"
            data-pin-scale-width="70"
            target="_blank noreferrer"
            href="https://www.pinterest.com/paigevogie/"
          >
            Paige Vogie on Pinterest.
          </a>
        </div>
        <div className="pinterest-embed-lg">
          <a
            data-pin-do="embedUser"
            data-pin-board-width="325"
            data-pin-scale-height="240"
            data-pin-scale-width="60"
            target="_blank noreferrer"
            href="https://www.pinterest.com/paigevogie/"
          >
            Paige Vogie on Pinterest.
          </a>
        </div>
        {/* LinkedIn */}
        <LinkedIn />
      </div>
    </div>
  </Layout>
);

export default About;
