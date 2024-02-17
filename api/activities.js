import { getStravaActivities } from "../pages/service/stravaService";

export default async function handler(request, response) {
  const activities = await getStravaActivities({
    ...(request.query.perPage ? { perPage: request.query.perPage } : {}),
    ...(request.query.page ? { page: request.query.page } : {}),
  });

  return response.status(200).json(activities);
}
