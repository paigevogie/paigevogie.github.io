import { getStravaActivities } from "../../service/stravaService";

export default async function handler(request, response) {
  const activities = await getStravaActivities(75, request.query.page);
  return response.status(200).json(activities);
}
