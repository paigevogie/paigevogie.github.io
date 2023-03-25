import React from "react";
import Head from "next/head";

const Pinterest = () => (
  <>
    <Head>
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
    </Head>
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
  </>
);

export default Pinterest;
