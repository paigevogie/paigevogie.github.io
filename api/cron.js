import { updateGarminData } from "../src/service/garminService";

export default async function handler(request, response) {
  const newData = await (await fetch(`${process.env.HOST}/api/steps`)).json();
  console.info("NEW DATA", newData);

  const udpatedData = await updateGarminData(newData);
  return response.status(200).json(udpatedData);
}
