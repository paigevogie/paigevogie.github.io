import React from "react";
import Script from "next/script";

const Pinterest = () => (
  <>
    <Script src="//assets.pinterest.com/js/pinit.js" />
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
