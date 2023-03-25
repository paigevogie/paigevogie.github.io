import * as React from "react";

export async function getServerData() {
  const response = await fetch(
    "https://www.strava.com/api/v3/athlete/activities",
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAVA_TOKEN}`,
      },
    }
  );

  // if (!response.ok) {
  //   console.error("STRAVA ERROR", response);
  //   throw new Error(`Response failed`);
  // }

  debugger;

  if (response.ok) {
    return {
      props: await response.json(),
    };
  } else {
    return {
      props: response,
    };
  }
}

const Strava = (props) => {
  console.log("STRAVA PROPS", props);
  return (
    <div className="strava-embed">
      <iframe
        title="Strava Runs"
        src="https://www.strava.com/athletes/55412609/latest-rides/66f1db3bfecd2a5d3c8fb9e689c8e825d99673df"
        height="100%"
        width="100%"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default Strava;
