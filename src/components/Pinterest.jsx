import React from "react";
import Script from "next/script";

const Pinterest = () => (
  <>
    <Script beforeInteractive src="//assets.pinterest.com/js/pinit.js" />
    <div className="pinterest-embed">
      <a
        data-pin-do="embedUser"
        data-pin-board-width="280"
        data-pin-scale-height="190"
        data-pin-scale-width="80"
        target="_blank noreferrer"
        href="https://www.pinterest.com/paigevogie/"
      >
        Paige Vogie on Pinterest.
      </a>
    </div>
  </>
);

export default Pinterest;
