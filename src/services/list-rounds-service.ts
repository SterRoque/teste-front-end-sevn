import { Round } from "../interfaces/tournament-interface";

type TListRoundsServiceResponse = Round[];

export async function listRoundsService(): Promise<TListRoundsServiceResponse> {
  const response = await fetch(import.meta.env.VITE_APP_API_URL);
  const data = await response.json();

  return data;
}
