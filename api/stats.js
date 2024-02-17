import { getGarminData } from "../pages/service/garminService";

export default async function handler(request, response) {
  const data = await getGarminData({
    ...(request.query.perPage ? { perPage: request.query.perPage } : {}),
    ...(request.query.page ? { page: request.query.page } : {}),
  });

  return response.status(200).json(data);
}
