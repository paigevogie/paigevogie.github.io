import React from "react";
import styles from "./index.module.scss";

const Spotify = () => (
  <div className={styles["spotify-embed"]}>
    <iframe
      title="Spotify Playlist"
      src="https://open.spotify.com/embed/playlist/7i09qruRU3qtgh9lU0ypqc?utm_source=generator"
      width="100%"
      height="352"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ border: 0 }}
    ></iframe>
  </div>
);

export default Spotify;
