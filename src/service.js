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

    const dataResponse = await fetch(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${stravaToken.access_token}`,
        },
      }
    );

    if (dataResponse.status !== 200) {
      throw new Error("Token data response status: " + dataResponse.status);
    }

    const stravaData = await dataResponse.json();

    fs.writeFileSync("./data/stravaData.json", JSON.stringify(stravaData));

    return stravaData;
  } catch (err) {
    console.error("Error fetching Strava data", err);
  }
};
