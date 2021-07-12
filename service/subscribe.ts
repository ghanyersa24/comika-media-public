/* eslint-disable no-unused-vars */
import { client } from "../lib/clientRaw";

const URL = "/payment/subscribe";
export const subscribe = async (subscribePlan: string): Promise<any> => {
  const res = await client.post(URL, { package: subscribePlan });
  return res;
};
