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
        async
        defer
        src="https://platform.linkedin.com/badges/js/profile.js"
      ></script>
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
      <script
        async
        defer
        src="https://www.goodreads.com/review/grid_widget/119223870?cover_size=medium&hide_link=&hide_title=true&num_books=9&order=d&shelf=read&sort=date_read&widget_id=1645964204"
      ></script>
    </Helmet>
    <div className="embeds">
      <iframe
        title="Spotify Playlist"
        className="spotify-embed"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1EUMDoJuT8yJsl?utm_source=generator"
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
        <div id="gr_grid_widget_1645964204">
          <div className="gr_grid_container">
            {/* Fallback books */}
            {/*<div className="gr_grid_book_container"><a title="A Woman Is No Man" rel="nofollow" href="https://www.goodreads.com/book/show/34313931-a-woman-is-no-man"><img alt="A Woman Is No Man" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533072101l/34313931._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Last Kingdom (The Saxon Stories, #1)" rel="nofollow" href="https://www.goodreads.com/book/show/68527.The_Last_Kingdom"><img alt="The Last Kingdom" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1407107780l/68527._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Handmaid's Tale" rel="nofollow" href="https://www.goodreads.com/book/show/688954.The_Handmaid_s_Tale"><img alt="The Handmaid's Tale" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1486848363l/688954._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Martian" rel="nofollow" href="https://www.goodreads.com/book/show/18007564-the-martian"><img alt="The Martian" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413706054l/18007564._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing" rel="nofollow" href="https://www.goodreads.com/book/show/22551617-the-life-changing-magic-of-tidying-up"><img alt="The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1418764561l/22551617._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The One" rel="nofollow" href="https://www.goodreads.com/book/show/31422857-the-one"><img alt="The One" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1486821619l/31422857._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Why We Sleep: The New Science of Sleep and Dreams" rel="nofollow" href="https://www.goodreads.com/book/show/40613901-why-we-sleep"><img alt="Why We Sleep: The New Science of Sleep and Dreams" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529710074l/40613901._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="A Defense of Abortion" rel="nofollow" href="https://www.goodreads.com/book/show/36140081-a-defense-of-abortion"><img alt="A Defense of Abortion" border="0" src="https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png" /></a></div>
            <div className="gr_grid_book_container"><a title="There There" rel="nofollow" href="https://www.goodreads.com/book/show/36692478-there-there"><img alt="There There" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1512071034l/36692478._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Becoming" rel="nofollow" href="https://www.goodreads.com/book/show/38746485-becoming"><img alt="Becoming" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528206996l/38746485._SX98_.jpg" /></a></div>*/}
          </div>
        </div>
        <div
          className="linkedin-embed badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="medium"
          data-theme="light"
          data-type="VERTICAL"
          data-vanity="paigevogie"
          data-version="v1"
        ></div>
      </div>
    </div>
  </Layout>
);

export default About;
