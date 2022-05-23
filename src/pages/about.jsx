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
        defer
        src="https://platform.linkedin.com/badges/js/profile.js"
      ></script>
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
      <script
        async
        defer
        src="https://www.goodreads.com/review/grid_widget/119223870?cover_size=medium&hide_link=&hide_title=true&num_books=9&order=d&shelf=read&sort=date_read&widget_id="
      ></script>
    </Helmet>
    <div className="embeds">
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
      <div className="pinterest-embed">
        <a
          data-pin-do="embedUser"
          data-pin-board-width="255"
          data-pin-scale-height="166"
          data-pin-scale-width="60"
          target="_blank"
          href="https://www.pinterest.com/paigevogie/"
        ></a>
      </div>
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

      <div className="goodreads-embed">
        <a
          rel="nofollow"
          target="_blank"
          className="logo"
          href="https://www.goodreads.com/review/list/119223870-paige-vogie?shelf=read&utm_medium=api&utm_source=grid_widget"
        >
          <img
            alt="Goodreads logo"
            src="https://s.gr-assets.com/images/layout/goodreads_logo_140.png"
          />
        </a>
        <div id="gr_grid_widget_">
          <div className="gr_grid_container"></div>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
