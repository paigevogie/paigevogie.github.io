import { kv } from "@vercel/kv";
import { handleResponseError } from "./serviceUtils";

const getStravaToken = async () => {
  try {
    const stravaToken = await kv.get("strava_token");
    const isExpired = Date.now() / 1000 > stravaToken.expires_at;

    if (!stravaToken || isExpired) {
      const tokenResponse = await fetch(
        `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${stravaToken.refresh_token}&grant_type=refresh_token`,
        {
          method: "POST",
        }
      );
      handleResponseError(tokenResponse, "Token Refresh");

      const newStravaToken = await tokenResponse.json();
      await kv.set("strava_token", newStravaToken);

      console.info("New strava token:", newStravaToken);

      return newStravaToken;
    }

    return stravaToken;
  } catch (err) {
    console.error(`Error getting strava token: ${err}`);
  }
};

const getStravaMap = ({ map }) => {
  const MAP_STYLE = "streets-v12";
  const DIMENSIONS = "100x100";
  const STROKE_WIDTH = 2;
  const STROKE_COLOR = "FC5200";
  const STROKE_OPACITY = 1;
  const PADDING = 8;

  return `https://api.mapbox.com/styles/v1/mapbox/${MAP_STYLE}/static/path-${STROKE_WIDTH}+${STROKE_COLOR}-${STROKE_OPACITY}(${encodeURIComponent(
    map.summary_polyline
  )})/auto/${DIMENSIONS}?padding=${PADDING}&access_token=${
    process.env.MAPBOX_TOKEN
  }`;
};

const getStravaHeaders = async () => ({
  headers: {
    Authorization: `Bearer ${(await getStravaToken()).access_token}`,
  },
});

const getStravaActivities = async ({ perPage = 10, page = 1, ...args }) => {
  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}&page=${page}`,
    await getStravaHeaders()
  );
  handleResponseError(response, "Strava Activities");

  return (await response.json()).map(
    ({
      name,
      id,
      type,
      distance,
      moving_time,
      average_speed,
      start_date_local,
      map,
    }) => ({
      name,
      id,
      type,
      distance,
      moving_time,
      average_speed,
      start_date_local,
      ...(args.map ? { map } : {}),
    })
  );
};

export { getStravaActivities, getStravaHeaders, getStravaMap };
