// use: http://localhost:3000/api/teamprojects

export default function handler(req, res) {
  // Define the JSON data
  const data = {
    teams: [
      {
        teamName: '/team_projects/project1',
      },
      {
        teamName: '/team_projects/project2',
      },
    ],
  };

  // Send JSON response
  res.status(200).json(data);
}
