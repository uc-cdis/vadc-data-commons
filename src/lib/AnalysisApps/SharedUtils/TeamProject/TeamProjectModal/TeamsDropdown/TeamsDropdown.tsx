import React from 'react';
import { Select } from '@mantine/core';

interface Team {
  teamName: string;
}

interface TeamsDropdownProps {
  teams: Team[];
  selectedTeamProject: string | null | false;
  setSelectedTeamProject: (selectedTeamProject: string) => void;
}

const TeamsDropdown: React.FC<TeamsDropdownProps> = ({
  teams,
  selectedTeamProject,
  setSelectedTeamProject,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTeamProject(selectedValue);
  };

  const selectedValue =
    selectedTeamProject === null || selectedTeamProject === false
      ? 'placeholder'
      : selectedTeamProject;

  return (
    <div data-testid="teams-dropdown">
      <Select
        label="Select Team Project"
        placeholder="-select one of the team projects below-"
        data={teams.map((team) => team.teamName)}
      />
    </div>
  );
};

export default TeamsDropdown;
