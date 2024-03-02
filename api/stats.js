import { getGarminData } from "../pages/service/garminService";

export default async function handler(request, response) {
  const { perPage, page, updateDays } = request.query;
  const data = await getGarminData({
    perPage,
    page,
    updateDays,
  });

  return response.status(200).json(data);
}
