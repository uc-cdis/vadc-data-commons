import React from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';
import { LassoParameters } from './LassoParameters';
import { RandomForestParameters } from './RandomForestParameters';
import { SupportVectorMachineParameters } from './SupportVectorMachineParameters';
import { useState } from 'react';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@mantine/core';
import { Flex, Box, Title } from '@mantine/core';

interface ModelOptionType {
  [key:string]: string;
}

const modelOptions:ModelOptionType = {
  'Lasso-Logistic-Regression':'Lasso Logistic Regression',
  'Random-Forest':'Random Forest',
  'Support-Vector-Machine':'Support Vector Machine',
  'Ada-Boost':'Ada Boost',
  'Decision-Tree':'Decision Tree',
  'Naive-Bayes':'Naïve Bayes',
  'Multilayer-Perception-Model':'Multilayer Perception Model',
  'Nearest-Neighbors':'Nearest Neighbors',
};

type SelectModelAndParametersProps = {
  dispatch: (action: any) => void;
  model: string;
  modelParameters: Record<string, any>;
};

const SelectModelAndParameters = ({
  model = 'Lasso Logistic Regression',
  modelParameters,
  dispatch,
}: SelectModelAndParametersProps) => {
  const handleSetModel = (modelId: string) => {
    setActiveTab(modelId)
    dispatch({
      type: ACTIONS.SET_SELECTED_MODEL,
      payload: modelOptions[modelId],
    });
  };

  const getModelParameters = (modelId: string) => {
    switch (modelId) {
      case 'Lasso-Logistic-Regression':
        return <LassoParameters
          dispatch={dispatch}
          model={modelOptions[modelId]}// why is this passes it never changes?
          modelParameters={modelParameters}
        />;
      case 'Random-Forest':
         return <RandomForestParameters
          dispatch={dispatch}
          model={modelOptions[modelId]}// why is this passes it never changes?
          modelParameters={modelParameters}
         />;
      case 'Support-Vector-Machine':
         return <SupportVectorMachineParameters
          dispatch={dispatch}
          model={modelOptions[modelId]}// why is this passes it never changes?
          modelParameters={modelParameters}
         />;
      // add other cases...
      default:
        return "Not Available";
    }
  }

  const getIdFromModelName = (modelName: string) => modelName.replace(/\s+/g, '-');

  const [activeTab, setActiveTab] = useState<string>(getIdFromModelName(model));
  return (
    <Box>
      <Title order={4} mb="sm">
        Select a Model
      </Title>
      <Tabs
        value={activeTab}
        onChange={(e) => {handleSetModel(e ? e :'')}}
        orientation="vertical"
        variant="outline"
        keepMounted={false}// This loads default values on the selected tab
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
            {Object.keys(modelOptions).map((modelKey) => {
              return (
              <TabsTab key={modelKey} value={modelKey}>
                {modelOptions[modelKey]}
              </TabsTab>
            )})}
          </TabsList>

          <Box ml="md" style={{ flex: 1 }}>
            {Object.keys(modelOptions).map((modelKey) => {
              return (
              <TabsPanel key={modelKey} value={modelKey}>
                <Title order={5} mb="sm">
                  Selected model: {modelOptions[modelKey]}
                </Title>
                { getModelParameters(modelKey) }
              </TabsPanel>
            )})}
          </Box>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default SelectModelAndParameters;
