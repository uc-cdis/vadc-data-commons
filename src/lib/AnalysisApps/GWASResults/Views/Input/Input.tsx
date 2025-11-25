import React, { useContext } from 'react';
import { Loader } from '@mantine/core';
import DetailPageHeader from '../../Components/DetailPageHeader/DetailPageHeader';
import JobDetails from './JobDetails/JobDetails';
//import AttritionTableWrapper from './AttritionTable/AttrtitionTableWrapper';
import SharedContext from '../../Utils/SharedContext';
//import queryConfig from '../../../SharedUtils/QueryConfig';
import LoadingErrorMessage from '../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { useGetWorkflowDetailsQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

const Input = () => {
  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;
  const {data, error, isLoading, isFetching  } = useGetWorkflowDetailsQuery({
        workflowName: name,
        workflowUid: uid,
      });

  const displayTopSection = () => (
    <section className='results-top'>
      <div className='GWASResults-flex-row'>
        <div className='GWASResults-flex-col'>
          <DetailPageHeader pageTitle={'Input Details'} />
        </div>
      </div>
    </section>
  );

  if (isLoading || isFetching) {
    return (
      <React.Fragment>
        {displayTopSection()}
        <div className='spinner-container' data-testid='spinner'>
          <Loader />
        </div>
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <React.Fragment>
        {displayTopSection()}
        <LoadingErrorMessage
          data-testid='loading-error-message'
          message={`Error getting job details due to status: ${(error as {error: string})?.error ? (error as {error: string}).error : error}`}
        />
      </React.Fragment>
    );
  }

  return (
    <div className='results-view'>
      {displayTopSection()}
      {/*<AttritionTableWrapper data={data} />*/}
      <JobDetails data={data}/>
    </div>
  );
};
export default Input;
