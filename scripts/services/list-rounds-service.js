export async function listRoundsService() {
  const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
  const data = await response.json();

  return data;
}
