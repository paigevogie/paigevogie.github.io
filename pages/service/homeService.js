import { getBooksRead } from "storygraph-js";
import { handleResponseError } from "./serviceUtils";
import { getStravaActivities, getStravaMap } from "./stravaService";

export const getStorygraphData = async () => {
  try {
    return await getBooksRead("paigevogie");
  } catch (error) {
    console.error("Error fetching Storygraph data:", error);
    return {};
  }
};

export const getGithubData = async () => {
  try {
    const response = await fetch("https://api.github.com/users/paigevogie");
    handleResponseError(response, "Github");

    return await response.json();
  } catch (error) {
    console.error("Error fetching Github data:", error);
    return {};
  }
};

export const getLinkedInData = async () => {
  // Badge creation: https://www.linkedin.com/badges/profile/create?vanityname=paigevogie&preferredlocale=en_US&trk=public_profile-settings_badge
  // Badge script: https://platform.linkedin.com/badges/js/profile.js
  // Badge response: https://badges.linkedin.com/profile?locale=en_US&badgetype=VERTICAL&badgetheme=light&uid=56368&version=v1&maxsize=large&trk=profile-badge&vanityname=paigevogie
  // Hardcoding the response since it's flaky
  // eslint-disable-next-line no-useless-escape
  const response = `LIBadgeCallback("\n    <link rel=\"stylesheet\" href=\"https:\/\/static.licdn.com\/sc\/h\/135t5ftkti7ns2ro5ep3dghkj\">\n    \n    \n    \n    \n    \n    \n\n    <div class=\"profile-badge profile-badge--width-300 profile-badge--light\" dir=\"ltr\">\n      <div class=\"profile-badge__header profile-badge__header--light\">\n        <span class=\"sr-only\">LinkedIn<\/span>\n        \n  <icon class=\"profile-badge__header-logo-icon profile-badge__header-logo-icon--light\" aria-hidden=\"true\">\n    <svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" viewbox=\"0 0 84 21\" preserveaspectratio=\"xMinYMin meet\" version=\"1.1\" focusable=\"false\">\n      <g class=\"inbug\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0\" class=\"bug-text-color\" transform=\"translate(63.000000, 0.000000)\"><\/path>\n        <path d=\"M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z\" class=\"background\" fill=\"currentColor\"><\/path>\n      <\/g>\n      <g class=\"linkedin-text\">\n        <path d=\"M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z\" fill=\"currentColor\"><\/path>\n        <path d=\"M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z\" fill=\"currentColor\"><\/path>\n        <polygon fill=\"currentColor\" points=\"38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533\"><\/polygon>\n        <path d=\"M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z\" fill=\"currentColor\"><\/path>\n        <path d=\"M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z\" fill=\"currentColor\"><\/path>\n        <polygon fill=\"currentColor\" points=\"3 3 0 3 0 18 9 18 9 15 3 15\"><\/polygon>\n      <\/g>\n    <\/svg>\n  <\/icon>\n\n      <\/div>\n      <div class=\"profile-badge__content\">\n        \n      <img class=\"artdeco-entity-image artdeco-entity-image--circle-4\n           profile-badge__content-profile-image\" alt=\"Paige V.\" src=\"https:\/\/media.licdn.com\/dms\/image\/v2\/D5603AQHK1TIQuvf2Vg\/profile-displayphoto-shrink_200_200\/B56ZXpMXcqHEAc-\/0\/1743374088855?e=2147483647&amp;v=beta&amp;t=4oopzodEavMrnv2CzTLvrMcCWaHRlnf6JcQ6jBfcu9k\">\n  \n        <h3 class=\"profile-badge__content-profile-name\" itemprop=\"name\">\n          <a class=\"profile-badge__content-profile-name-link profile-badge__content-profile-name-link--light\" href=\"https:\/\/www.linkedin.com\/in\/paigevogie?trk=public-profile-badge-profile-badge-profile-name\" data-tracking-control-name=\"public-profile-badge-profile-badge-profile-name\" data-tracking-will-navigate>\n            Paige V.\n          <\/a>\n        <\/h3>\n\n          <h4 class=\"profile-badge__content-profile-headline\">\n            Senior Software Engineer @ Headway\n          <\/h4>\n\n          <h4 class=\"profile-badge__content-profile-company-school-info\">\n            <a href=\"https:\/\/www.linkedin.com\/company\/find-headway-com?trk=public-profile-badge-profile-badge_company-name\" class=\"profile-badge__content-profile-company-school-info-link profile-badge__content-profile-company-school-info-link--light\" data-tracking-control-name=\"public-profile-badge-profile-badge_company-name\" data-tracking-will-navigate=\"true\">Headway<\/a> | <a href=\"https:\/\/www.linkedin.com\/school\/uc-berkeley\/?trk=public-profile-badge-profile-badge_school-name\" class=\"profile-badge__content-profile-company-school-info-link profile-badge__content-profile-company-school-info-link--light\" data-tracking-control-name=\"public-profile-badge-profile-badge_school-name\" data-tracking-will-navigate=\"true\">University of California, Berkeley<\/a>\n          <\/h4>\n      <\/div>\n      <a class=\"profile-badge__cta-btn profile-badge__cta-btn--light\" href=\"https:\/\/www.linkedin.com\/in\/paigevogie?trk=public-profile-badge-profile-badge-view-profile-cta\" target=\"_blank\" data-tracking-control-name=\"public-profile-badge-profile-badge-view-profile-cta\" data-tracking-will-navigate>\n        View profile\n      <\/a>\n<!---->    <\/div>\n  \n  ",56368)`;
  const html = response
    .replace(`LIBadgeCallback("`, "") // remove function call
    .replace(/",\d*\)/, "") // remove second param
    .replace(/<link.*?>/, "") // remove stylesheet link
    .replaceAll("<a ", '<a target="_blank"'); // add missing target="_blank"

  return html;
};

export const getStravaData = async () => {
  try {
    const SIZE = 20;
    const stravaActivities = await getStravaActivities({
      perPage: SIZE,
      map: true,
    });

    const activitiesData = await Promise.all(
      stravaActivities
        // only return activities witha map
        .filter((activity) => !!activity.map?.summary_polyline)
        .map(async (activity) => {
          activity.map.url = getStravaMap(activity);
          console.log("MAP", activity.map.url);
          return activity;
        })
    );

    return activitiesData;
  } catch (err) {
    console.error("Error fetching Strava data", err);
    return [];
  }
};
