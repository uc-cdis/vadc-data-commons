import React from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';
import { NumberInput,
  //Checkbox
 } from '@mantine/core';

type AddCovariatesProps = {
  dispatch: (action: any) => void;
  minimumCovariateOccurrence?: number;
  //useAllCovariates?: boolean;
};

const AddCovariates = ({
  minimumCovariateOccurrence = 0.1,
  //useAllCovariates = true,
  dispatch,
}: AddCovariatesProps) => {
  const handleSetMinimumCovariateOccurrence = (minimumCovariateOccurrence: number) => {
    dispatch({
      type: ACTIONS.SET_MINIMUM_COVARIATE_OCCURRENCE,
      payload: minimumCovariateOccurrence,
    });
  };

  // const handleUseAllCovariates = (useAllCovariates: boolean) => {
  //   dispatch({
  //     type: ACTIONS.SET_USE_ALL_COVARIATES,
  //     payload: useAllCovariates,
  //   });
  // };

  return (
    <div data-tour="define-dataset-observation-window">
      <NumberInput
        placeholder="Enter %"
        min={0.1}
        step={0.1}
        defaultValue={0.1}
        rightSection="%"
        value={minimumCovariateOccurrence}
        onChange={(value) => {
          if (typeof value === 'number') {
            handleSetMinimumCovariateOccurrence(value);
          }
        }}
      />
{/*  OPTION removed for now
      <Checkbox
        mt="md"
        label="Use all covariates"
        checked={useAllCovariates}
        onChange={(event) => handleUseAllCovariates(event.currentTarget.checked)}
      /> */}
    </div>
  );
};

export default AddCovariates;
