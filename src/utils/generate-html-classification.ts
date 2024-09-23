import { Game } from "../interfaces/tournament-interface";

export function generateHTMLClassification(
  game: Game,
  isLastGameOfCurrentRound: boolean = false
) {
  const teamHome = game.team_home_id.slice(-1);
  const teamAway = game.team_away_id.slice(-1);

  const htmlClassification = `
      <div class="classification">
           <div class="team">
             <img src="/icons/team_shield_${teamHome}.svg" alt="Time ${teamHome.toUpperCase()}" />
             <p>Time ${teamHome.toUpperCase()}</p>
           </div>
           <div class="points">
             <p>${game.team_home_score}</p>
             <img src="/icons/x.svg" alt="" width="12px" height="12px" />
             <p>${game.team_away_score}</p>
           </div>
           <div class="team">
             <img src="/icons/team_shield_${teamAway}.svg" alt="Time ${teamAway.toUpperCase()}" />
             <p>Time ${teamAway.toUpperCase()}</p>
           </div>
  
           </div>
           
           ${!isLastGameOfCurrentRound ? '<div class="divider"></div>' : ""}
   `;

  return htmlClassification;
}
