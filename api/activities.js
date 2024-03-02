import { getStravaActivities } from "../pages/service/stravaService";

export default async function handler(request, response) {
  const { perPage, page } = request.query;
  const activities = await getStravaActivities({
    perPage,
    page,
  });

  return response.status(200).json(activities);
}
