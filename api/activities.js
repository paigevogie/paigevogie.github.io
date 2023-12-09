import { getStravaActivities } from "../pages/service/stravaService";

export default async function handler(request, response) {
  const activities = await getStravaActivities(200, request.query.page);
  return response.status(200).json(activities);
}
