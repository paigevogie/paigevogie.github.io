import { kv } from "@vercel/kv";

export const getGarminData = async () => await kv.get("garmin_data");
