import { Round } from "../interfaces/tournament-interface";

type TListRoundsServiceResponse = Round[];

export async function listRoundsService(): Promise<TListRoundsServiceResponse> {
  const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
  const data = await response.json();

  return data;
}
