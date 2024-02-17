import { kv } from "@vercel/kv";

const GARMIN_DATA = "garmin_data";

export const getGarminData = async ({ perPage, page = 1 }) => {
  const data = await kv.get(GARMIN_DATA);

  // only get new data for first page
  if (page === 1) {
    try {
      const newData = await (
        await fetch(`${process.env.HOST}/api/garmin`)
      ).json();

      await kv.set(GARMIN_DATA, { ...data, ...newData });
    } catch (err) {
      console.log("Unable to fetch new garmin data:", err);
    }
  }

  const paginatedData = Object.keys(data)
    .sort((a, b) => new Date(b) - new Date(a))
    .slice(perPage * (page - 1), perPage * page)
    .reduce((acc, date) => {
      acc[date] = data[date];
      return acc;
    }, {});

  return paginatedData;
};
