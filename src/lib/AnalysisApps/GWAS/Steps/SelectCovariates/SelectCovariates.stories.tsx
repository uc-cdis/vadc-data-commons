import React, { useReducer } from 'react';
import reducer from '../../Utils/StateManagement/reducer';
import InitializeCurrentState from '../../Utils/StateManagement/InitializeCurrentState';
import { MantineProvider } from '@mantine/core';
import { GWASTheme } from '../../GWASContainer';

import { Meta, StoryObj } from '@storybook/react';
 
import SelectCovariates from './SelectCovariates';
 
const meta: Meta<typeof SelectCovariates> = {
  title: 'GWASAPP/Steps/SelectCovariates',
  component: SelectCovariates,
};
 
export default meta;
type Story = StoryObj<typeof SelectCovariates>;
 

const SelectCovariatesWithHooks = () => {

  const [state, dispatch] = useReducer(reducer, InitializeCurrentState());
  return <MantineProvider theme={GWASTheme}>
      <SelectCovariates
        studyPopulationCohort={state.selectedStudyPopulationCohort}
        outcome={state.outcome}
        covariates={state.covariates}
        dispatch={dispatch}
        selectedTeamProject={state.selectedTeamProject}
      />
    </MantineProvider>;
};
 
export const Mock: Story = {
  render: () => <SelectCovariatesWithHooks />,
};
