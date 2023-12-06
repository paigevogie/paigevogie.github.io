import { kv } from "@vercel/kv";

const GARMIN_DATA = "garmin_data";

export const getGarminData = async () => await kv.get(GARMIN_DATA);

export const updateGarminData = async (newData) => {
  const data = await kv.get(GARMIN_DATA);
  const mergedData = { ...data, ...newData };

  await kv.set(GARMIN_DATA, mergedData);
  return mergedData;
};
