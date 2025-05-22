import React from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';
import { LassoParameters } from './LassoParameters';
import { RandomForestParameters } from './RandomForestParameters';
import { useState } from 'react';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@mantine/core';
import { NumberInput, Flex, Box, Title, rem } from '@mantine/core';

const modelOptions = [
  'Lasso Logistic Regression',
  'Random Forest',
  'Gradient Boosting Machine',
  'Ada Boost',
  'Decision Tree',
  'Naïve Bayes',
  'Multilayer Perception Model',
  'Nearest Neighbors',
];

type SelectModelAndParametersProps = {
  dispatch: (action: any) => void;
  model?: string;
  modelParameters?: string;
  selectedTeamProject: string;
};

const SelectModelAndParameters = ({
  model,
  modelParameters,
  dispatch,
  selectedTeamProject,
}: SelectModelAndParametersProps) => {
  const handleSetModel = (model: string) => {
    dispatch({
      type: ACTIONS.SET_NUMBER_OF_CROSS_VALIDATION_FOLDS,
      payload: model,
    });
  };

  const handlePercentageOfDataToUseAsTest = (percentageOfDataToUseAsTest: number) => {
    dispatch({
      type: ACTIONS.SET_PERCENTAGE_OF_DATA_TO_USE_AS_TEST,
      payload: percentageOfDataToUseAsTest,
    });
  };

  const getModelParameters = (model: string) => {
    switch (model) {
      case 'Lasso Logistic Regression':
        return <LassoParameters />;
      case 'Random Forest':
         return <RandomForestParameters />;
      // case 'Gradient Boosting Machine':
      //   return <GBMParameters />;
      // add other cases
      default:
        return "Not Available";
    }
  }

  const [activeTab, setActiveTab] = useState<string | null>(modelOptions[0]);
  return (
    <Box>
      <Title order={4} mb="sm">
        Select a Model
      </Title>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        orientation="vertical"
        variant="outline"
      >
        <Flex align="flex-start">
          <TabsList
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minWidth: 250,
              flexShrink: 0,
            }}
          >
            {modelOptions.map((model) => (
              <TabsTab key={model} value={model}>
                {model}
              </TabsTab>
            ))}
          </TabsList>

          <Box ml="md" style={{ flex: 1 }}>
            {modelOptions.map((model) => (
              <TabsPanel key={model} value={model}>
                <Title order={5} mb="sm">
                  Selected model: {model}
                </Title>
                { getModelParameters(model) }
              </TabsPanel>
            ))}
          </Box>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default SelectModelAndParameters;
