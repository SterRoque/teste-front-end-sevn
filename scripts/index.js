import { listRoundsService } from "./list-rounds-service.js";

async function showRounds() {
  const listRoundsServiceResponse = await listRoundsService();

  const panelContainer = document.getElementById("panel");

  for (const game of listRoundsServiceResponse[0].games) {
    const teamHome = game.team_home_id.slice(-1);
    const teamAway = game.team_away_id.slice(-1);

    const lastGameOfCurrentRound =
      listRoundsServiceResponse[0].games[
        listRoundsServiceResponse[0].games.length - 1
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

    panelContainer.innerHTML += htmlClassification;
  }
}

onload = () => {
  showRounds();
};
