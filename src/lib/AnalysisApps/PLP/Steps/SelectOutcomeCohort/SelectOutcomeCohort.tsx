import React from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';
import SelectCohort from '../../Components/SelectCohort/SelectCohort';

type SelectOutcomeCohortProps = {
  dispatch: (action: any) => void;
  selectedCohort?: number;
  selectedTeamProject: string;
};

const SelectOutcomeCohort = ({
  selectedCohort,
  dispatch,
  selectedTeamProject,
}: SelectOutcomeCohortProps) => {
  const handleCohortSelect = (selectedRow: number) => {
    dispatch({
      type: ACTIONS.SET_SELECTED_OUTCOME_COHORT,
      payload: selectedRow,
    });
  };

  return (
    <div data-tour="cohort-select">
      <SelectCohort
        selectedCohort={selectedCohort}
        handleCohortSelect={handleCohortSelect}
        selectedTeamProject={selectedTeamProject}
      />
    </div>
  );
};

export default SelectOutcomeCohort;
