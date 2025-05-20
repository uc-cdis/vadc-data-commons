import React from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';
import { NumberInput } from '@mantine/core';
import { toInteger } from 'lodash';


type DefineDatasetObservationWindowProps = {
  dispatch: (action: any) => void;
  datasetObservationWindow?: number;
  selectedTeamProject: string;
};

const DefineDatasetObservationWindow = ({
  datasetObservationWindow,
  dispatch,
  selectedTeamProject,
}: DefineDatasetObservationWindowProps) => {
  const handleDefineDatasetObservationWindow = (datasetObservationWindow: number) => {
    dispatch({
      type: ACTIONS.SET_DATASET_OBSERVATION_WINDOW,
      payload: datasetObservationWindow,
    });
  };

  return (
    <div data-tour="define-dataset-observation-window">
      <NumberInput
        placeholder="Enter number of days"
        min={0}
        value={datasetObservationWindow}
        onChange={(e) => handleDefineDatasetObservationWindow(toInteger(e))}
      />
    </div>
  );
};

export default DefineDatasetObservationWindow;
