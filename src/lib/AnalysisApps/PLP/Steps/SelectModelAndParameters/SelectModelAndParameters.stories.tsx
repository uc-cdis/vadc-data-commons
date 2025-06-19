import React from 'react';
import SelectModelAndParameters from './SelectModelAndParameters';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SelectModelAndParameters> = {
  title: 'PLP/SelectModelAndParameters',
  component: SelectModelAndParameters,
};

export default meta;
type Story = StoryObj<typeof SelectModelAndParameters>;


const SelectModelAndParametersWithHooks = () => {

  return (
    <SelectModelAndParameters
          model={''}
          modelParameters={[]}
          dispatch={() => {return null}} // TODO - improve to update some state and make story useful for testing
     />
  );
};

export const SelectModelAndParametersMockedSuccess: Story = {
  render: () => <SelectModelAndParametersWithHooks />, // see https://storybook.js.org/docs/writing-stories
};
