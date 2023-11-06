import { Octokit } from "octokit";

export const getLibbyData = async () => {
  try {
    const response = await fetch(process.env.LIBBY_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching Libby data:", error);
  }
};

export const getGithubData = async () => {
  try {
    const githubResponse = await new Octokit({
      auth: process.env.GITHUB_TOKEN,
    }).request("GET /users/paigevogie");

    if (githubResponse.status === 200) {
      return githubResponse.data;
    } else {
      throw Error("Github Response: " + githubResponse);
    }
  } catch (error) {
    console.error("Error fetching Github data:", error);
  }
};

export const getStravaData = async () => {
  try {
    const fs = require("fs");
    let stravaToken = JSON.parse(fs.readFileSync("./data/stravaToken.json"));
    const isExpired = Date.now() / 1000 > stravaToken.expires_at;

    if (isExpired) {
      const tokenResponse = await fetch(
        `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${stravaToken.refresh_token}&grant_type=refresh_token`,
        {
          method: "POST",
        }
      );

      if (tokenResponse.status !== 200) {
        throw new Error(
          "Token refresh response status: " + tokenResponse.status
        );
      }

      stravaToken = await tokenResponse.json();

      fs.writeFileSync("./data/stravaToken.json", JSON.stringify(stravaToken));
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${stravaToken.access_token}`,
      },
    };

    const athleteResponse = await fetch(
      "https://www.strava.com/api/v3/athlete/activities",
      headers
    );

    if (athleteResponse.status !== 200) {
      throw new Error("Athlete response status: " + athleteResponse.status);
    }

    const atheleteData = await athleteResponse.json();

    fs.writeFileSync("./data/stravaData.json", JSON.stringify(atheleteData));

    const activitiesData = await Promise.all(
      atheleteData.slice(0, 25).map(async (activity) => {
        const activityResponse = await fetch(
          `https://www.strava.com/api/v3/activities/${activity.id}`,
          headers
        );

        if (activityResponse.status !== 200) {
          throw new Error(
            "Activity response status: " + activityResponse.status
          );
        }

        return await activityResponse.json();
      })
    );

    fs.writeFileSync(
      "./data/stravaActivities.json",
      JSON.stringify(activitiesData)
    );

    return activitiesData;
  } catch (err) {
    console.error("Error fetching Strava data", err);
  }
};
