import React from 'react';
import LoadingErrorMessage from '../LoadingErrorMessage/LoadingErrorMessage';
import { Loader, Progress } from '@mantine/core';
import { GEN3_API } from '@gen3/core';
import useSWR from 'swr';

const WorkflowLimitsDashboard = React.memo(() => {
  const supportEmail = 'support@gen3.org';
  const refetchInterval = 5000;

  const { data, error, isLoading, isValidating } = useSWR(
    `${GEN3_API}/ga4gh/wes/v2/workflows/user-monthly`,
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: refetchInterval },
  );

  const workflowLimitInfoIsValid = (data: any) => {
    // Check if data is an object
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    // validate data contains expected keys and they're numeric
    // and workflow limit is greater than 0
    if (
      typeof data?.workflow_run !== 'number'
      || typeof data?.workflow_limit !== 'number'
      || !(data.workflow_limit > 0)
    ) {
      return false;
    }
    return true;
  };


  if (!data && (isLoading || isValidating)) {
    return (
      <div className='workflow-limits-dashboard row'>
        <div className='spinner-container'>
          <Loader /> Retrieving user workflow information.
          <br />
          Please wait...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='workflow-limits-dashboard row'>
        <LoadingErrorMessage message={'Unable to gather user workflow information.'} />
      </div>
    );
  }
  if (!workflowLimitInfoIsValid(data)) {
    return (
      <div className='workflow-limits-dashboard row'>
        <LoadingErrorMessage message={'Invalid server response for user workflow information.'} />
      </div>
    );
  }
  const workflowRun = data.workflow_run;
  const workflowLimit = data.workflow_limit;

  return (
    <React.Fragment>
      <div className='workflow-limits-dashboard row'>
        <div className='column'>
          <h3>Monthly Workflow Limit</h3>
          <div data-testid='workflow-limits-message'>
            <strong>{workflowRun} used</strong> from {workflowLimit} Limit
          </div>
        </div>
        <div className='column progress'>
          {workflowRun >= workflowLimit && (
            <div>
              <div
                className='error-message'
                data-testid='workflow-exceeds-message'
              >
                You have exceeded your monthly workflow limit. Please contact
                support for assistance:{' '}
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
              </div>
            </div>
          )}
          <Progress
            value={(workflowRun / workflowLimit) * 100}
            color={workflowRun >= workflowLimit ? 'red' : 'blue'}
          />
        </div>
      </div>
    </React.Fragment>
  );
});

export default WorkflowLimitsDashboard;
