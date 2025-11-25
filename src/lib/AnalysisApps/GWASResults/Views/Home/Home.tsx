import React from 'react';
import HomeTable from './HomeTable/HomeTable';
import LoadingErrorMessage from '../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { Loader } from '@mantine/core';
import { useGetWorkflowsQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

const Home = ({ selectedTeamProject }: { selectedTeamProject: string }) => {
  const tranformDates = (data: any) => {
    return data.map((item: any) => ({
      ...item,
      startedAt: new Date(item.startedAt),
      submittedAt: new Date(item.submittedAt),
      finishedAt: new Date(item.finishedAt),
    }));
  };
  const {data, error, isLoading, isFetching  } = useGetWorkflowsQuery(selectedTeamProject);

  if (isLoading || isFetching) {
    return (
      <React.Fragment>
        <div className="spinner-container">
          <Loader /> Retrieving the list of workflows.
          <br />
          Please wait...
        </div>
      </React.Fragment>
    );
  }
  if (error) {
    return <LoadingErrorMessage />;
  }
  return (
    <HomeTable data={tranformDates(data)} />
  );
};

export default Home;
