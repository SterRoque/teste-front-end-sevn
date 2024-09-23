import { listRoundsService } from "./list-rounds-service.js";

let currentRound = 1;
let allRoundsGames = [];

const gamesContainer = document.getElementById("games");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const currentRoundText = document.getElementById("current-round-text");

async function loadRoundsGames() {
  allRoundsGames = await listRoundsService();
}

function showRounds() {
  for (const game of allRoundsGames[currentRound - 1].games) {
    const teamHome = game.team_home_id.slice(-1);
    const teamAway = game.team_away_id.slice(-1);

    const lastGameOfCurrentRound =
      allRoundsGames[currentRound - 1].games[
        allRoundsGames[currentRound - 1].games.length - 1
      ];

    const isLastGameOfCurrentRound =
      game.team_home_id === lastGameOfCurrentRound.team_home_id &&
      game.team_away_id === lastGameOfCurrentRound.team_away_id;

    const htmlClassification = `
    <div class="classification">
         <div class="team">
           <img src="assets/team_shield_${teamHome}.svg" alt="Time ${teamHome.toUpperCase()}" />
           <p>Time ${teamHome.toUpperCase()}</p>
         </div>
         <div class="points">
           <p>${game.team_home_score}</p>
           <img src="assets/x.svg" alt="" width="12px" height="12px" />
           <p>${game.team_away_score}</p>
         </div>
         <div class="team">
           <img src="assets/team_shield_${teamAway}.svg" alt="Time ${teamAway.toUpperCase()}" />
           <p>Time ${teamAway.toUpperCase()}</p>
         </div>

         </div>
         
         ${!isLastGameOfCurrentRound ? '<div class="divider"></div>' : ""}

 `;

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
