import { kv } from "@vercel/kv";

const GARMIN_DATA = "garmin_data";

export const getGarminData = async ({
  perPage = 10,
  page = 1,
  updateDays = 3,
}) => {
  let data = await kv.get(GARMIN_DATA);

  // only get new data for first page
  if (page === 1) {
    try {
      const newData = await (
        await fetch(`${process.env.HOST}/api/garmin?days=${updateDays}`)
      ).json();

      data = { ...data, ...newData };
      await kv.set(GARMIN_DATA, data);
    } catch (err) {
      console.log("Unable to fetch new garmin data:", err);
    }
  }

  // return the max in case updateDays > perPage
  perPage = Math.max(perPage, updateDays);

  const paginatedData = Object.keys(data)
    .sort((a, b) => new Date(b) - new Date(a))
    .slice(perPage * (page - 1), perPage * page)
    .reduce((acc, date) => {
      acc[date] = data[date];
      return acc;
    }, {});

  return paginatedData;
};
