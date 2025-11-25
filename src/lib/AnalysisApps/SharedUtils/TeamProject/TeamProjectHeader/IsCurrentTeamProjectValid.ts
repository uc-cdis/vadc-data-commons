import { TeamProject } from '../Utils/teamProjectHooks';

const IsCurrentTeamProjectValid = (teams: TeamProject[]) => {
  if (!teams) {
    return false;
  }
  let currentTeamProjectIsValid = false;
  const currentTeamProject = localStorage.getItem('teamProject');
  teams.forEach((team) => {
    if (team.teamName === currentTeamProject) {
      currentTeamProjectIsValid = true;
    }
  });
  return currentTeamProjectIsValid;
};

export default IsCurrentTeamProjectValid;
