import { updateGarminData } from "../src/service/garminService";

export default async function handler(request, response) {
  const newData = await (await fetch(`${process.env.HOST}/api/garmin`)).json();
  const updatedData = await updateGarminData(newData);

  return response.status(200).json(updatedData);
}
