import React from 'react';
import { Card, Title, Group, Divider } from '@mantine/core';

import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { WorkflowDetails } from '@/lib/AnalysisApps/Results/Utils/workflowApi';


const JobDetails = ({ data }: {data?: WorkflowDetails}) => {
  if (!(data?.arguments?.parameters)) {
    return <LoadingErrorMessage message='Issue Loading Data for Job Details' />;
  }
  const dataPeramiters = data?.arguments?.parameters.reduce((acc: {[key: string]: string}, param) => {
    acc[param.name] = param.value;
    return acc;
  }, {});

  const modelRenderer = (modelListString: string) => {
    const modelListObj = JSON.parse(modelListString);
    const modelListObjItem = modelListObj[0];
    const modelListOutputItems = [{name: 'Model', value: modelListObjItem.name}];
    const param = modelListObjItem.params;
    Object.keys(param).forEach((key) => {
      modelListOutputItems.push({name: key, value: param[key]});
    });
    return modelListOutputItems;
  };


  return (
    <React.Fragment>
      <Card shadow="sm" padding="lg" radius="md" withBorder className='w-1/2'>
        <Card.Section>
          <Title order={3} className='p-4'>{data.wf_name}</Title>
          <Divider />
          <Group mt='sm' mb='sm'>
            <Group justify="space-between" className='w-full px-4'>
              <span>Dataset ID</span>
              <span>{dataPeramiters.dataset_id}</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Dataset Observation Window</span>
              <span>{dataPeramiters.dataset_observation_window} days</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Outcome of Interest ID</span>
              <span>{dataPeramiters.outcome_id}</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Outcome Window</span>
              <span>{dataPeramiters.outcome_observation_window} days</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Dataset size (after time window filters)</span>
              <span>see attrition table</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Training set size</span>
              <span>see attrition table</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Testing set size</span>
              <span>see attrition table</span>
            </Group>
            <Group justify="space-between" className='w-full px-4'>
              <span>Cross-validation</span>
              <span>{dataPeramiters.n_fold} folds</span>
            </Group>
          </Group>
          <Divider />
          <Group mt='sm' mb='sm'>
            {modelRenderer(dataPeramiters.model_list).map(({name, value}, index) => (
              <Group 
              key={`${name}-${index}`}
              justify="space-between" 
              className='w-full px-4'>
                <span>{name}</span>
                <span>{value.toString()}</span>
              </Group>
            ))}
          </Group>
        </Card.Section>
      </Card>
    </React.Fragment>
  );
};

export default JobDetails;
