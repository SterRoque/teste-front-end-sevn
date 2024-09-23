import { IRound } from "./interfaces/tournament-interface.js";
import { listRoundsService } from "./services/list-rounds-service.js";
import { generateHTMLClassification } from "./utils/generate-html-classification.js";

let currentRound = 1;
let allRoundsGames: IRound[] = [];

const gamesContainer = document.getElementById("games") as HTMLElement;
const prevButton = document.getElementById("prev-button") as HTMLButtonElement;

const nextButton = document.getElementById("next-button") as HTMLButtonElement;
const currentRoundText = document.getElementById(
  "current-round-text"
) as HTMLElement;

async function loadRoundsGames() {
  allRoundsGames = await listRoundsService();
}

function showRounds() {
  for (const game of allRoundsGames[currentRound - 1].games) {
    const lastGameOfCurrentRound =
      allRoundsGames[currentRound - 1].games[
        allRoundsGames[currentRound - 1].games.length - 1
      ];

    const isLastGameOfCurrentRound =
      game.team_home_id === lastGameOfCurrentRound.team_home_id &&
      game.team_away_id === lastGameOfCurrentRound.team_away_id;

    const htmlClassification = generateHTMLClassification(
      game,
      isLastGameOfCurrentRound
    );

    gamesContainer.innerHTML += htmlClassification;
  }
}

function resetGamesContainer() {
  gamesContainer.innerHTML = "";
}

function verifyNavigateButtons() {
  if (currentRound === allRoundsGames.length) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }

  if (currentRound === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadRoundsGames();
  showRounds();

  nextButton.addEventListener("click", () => {
    currentRound++;

    currentRoundText.textContent = `Rodada ${currentRound}`;

    verifyNavigateButtons();

    resetGamesContainer();
    showRounds();
  });

  prevButton.addEventListener("click", () => {
    currentRound--;

    currentRoundText.textContent = `Rodada ${currentRound}`;

    verifyNavigateButtons();

    resetGamesContainer();
    showRounds();
  });
});
