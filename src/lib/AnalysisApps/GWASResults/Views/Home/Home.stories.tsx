import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
//import { QueryClient, QueryClientProvider } from 'react-query';
import SharedContext from '../../Utils/SharedContext';
//import { rest } from 'msw';
import Home from './Home';
import PHASES from '../../Utils/PhasesEnumeration';
import TableData from '../../TestData/TableData';
import InitialHomeTableState from './HomeTableState/InitialHomeTableState';
import { GwasWorkflowEndpoint } from '@/lib/AnalysisApps/SharedUtils/Endpoints';
import { http, HttpResponse, delay } from 'msw';
import { GWASResultsJobs } from './HomeTable/HomeTable';
import { GEN3_API } from '@gen3/core';

const meta: Meta<typeof Home> = {
  title: 'Results/Views/Home',
  component: Home,
  decorators: [
    (Story) => {
      const [selectedRowData, setSelectedRowData] = useState({} as GWASResultsJobs);
      const [homeTableState, setHomeTableState] = useState(InitialHomeTableState);
      const [currentView, setCurrentView] = useState('home');
      /*useEffect(() => {
        alert(`setCurrentView called with ${currentView}`);
      }, [currentView]);*/
      return (
          <SharedContext.Provider
            value={{
              selectedRowData,
              setSelectedRowData,
              setCurrentView,
              homeTableState,
              setHomeTableState,
            }}
          >
            <Story selectedTeamProject='test' />
          </SharedContext.Provider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Home>;

const TestData = [
  {
    cohort_definition_id: 573,
    cohort_name: 'team2 - test new cohort - catch all',
    size: 70240,
  },
  {
    cohort_definition_id: 559,
    cohort_name: 'test new cohort - catch all',
    size: 70240,
  },
  {
    cohort_definition_id: 574,
    cohort_name: 'team2 - test new cohort - medium + large',
    size: 23800,
  },
  {
    cohort_definition_id: 575,
    cohort_name: 'team2 - test new cohort - small',
    size: 80,
  },
];

let requestCount = 0;
let rowCount = 1;

const getMockPhase = (requestCount: number) => {
  if (requestCount % 2 === 0) {
    return PHASES.Running;
  } else if (requestCount % 5 === 0) {
    return PHASES.Error;
  } else if (requestCount % 7 === 0) {
    return PHASES.Failed;
  } else if (requestCount % 9 === 0) {
    return PHASES.Pending;
  } else {
    return PHASES.Succeeded;
  }
};

const workflowList = TableData;
const minWorkflowNum = 1e8;
const maxWorkflowNum = 1e9 - 1;
const createWorkflowNum = () =>
  Math.round(
    Math.random() * (maxWorkflowNum - minWorkflowNum) + minWorkflowNum
  );

const getMockWorkflowList = () => {
  requestCount++;
  const phase = getMockPhase(requestCount / 2);
  // simulate a new workflow only at each 2nd request:
  if (requestCount % 2 == 0) {
    workflowList.splice(0, 0, {
      name: 'argo-wrapper-workflow-' + createWorkflowNum(),
      gen3username: `${(requestCount * Math.E)
        .toString(36)
        .substr(2, 5)}@aol.com`,
      wf_name: 'User Added WF Name ' + requestCount,
      uid: 'uid-' + requestCount,
      phase: phase,
      finishedAt: (phase === PHASES.Running? null : new Date().toISOString()),
      submittedAt: new Date(new Date().getTime() - Math.random() * 1e12).toISOString(),
      startedAt: new Date().toISOString(),
    });
    rowCount++;
  }
  // simulate status change of some recent items:
  if (rowCount % 3 == 0) {
    workflowList[1].phase = PHASES.Succeeded;
    workflowList[2].phase = PHASES.Failed;
  }
  return workflowList;
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(2000);
            return HttpResponse.json(getMockWorkflowList());
          }
        ),
        http.get(
          `${GwasWorkflowEndpoint}/user-monthly`,
          async () => {
            await delay(1000);
            return HttpResponse.json({ workflow_run: 5, workflow_limit: 50 });
          }
        ),
        http.post(
          '/ga4gh/wes/v2/retry/:workflow',
          async ({ params }) => {
            await delay(800);
            const { workflow } = params;
            return HttpResponse.text(`${workflow} retried sucessfully`);
          }
        ),
      ],
    },
  }
};

export const MockedSuccessButFailedRetry: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(2000);
            return HttpResponse.json(getMockWorkflowList());
          }
        ),
        http.get(
          `${GwasWorkflowEndpoint}/user-monthly`,
          async () => {
            await delay(1000);
            return HttpResponse.json({ workflow_run: 5, workflow_limit: 50 });
          }
        ),
        http.post(
          '/ga4gh/wes/v2/retry/:workflow',
          async ({ params }) => {
            await delay(800);
            const { workflow } = params;
            return new HttpResponse(`${workflow} retry failed`, { status: 500 });
          }
        ),
      ],
    },
  }
};

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${GEN3_API}/${GwasWorkflowEndpoint}`, async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 500,
          });
        }),
      ],
    },
  },
};


export const MockedSuccessButExceededWorkflowLimitForRetries: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(2000);
            return HttpResponse.json(getMockWorkflowList());
          },
        ),
        http.get(
          `${GwasWorkflowEndpoint}/user-monthly`,
           async () => {
            await delay(1000);
            return HttpResponse.json({ workflow_run: 50, workflow_limit: 50 });
          }
        ),
      ],
    },
  }
};

export const MockedSuccessButWorkflowLimitReturnsMalformedDataForRetries: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(2000);
            return HttpResponse.json(getMockWorkflowList());
          },
        ),
        http.get(
          `${GwasWorkflowEndpoint}/user-monthly`,
          async () => {
            await delay(3000);
            return HttpResponse.json({
                workflow_run: 'a string and an array?',
                workflow_limit: [],
              });
          },
        ),
      ],
    },
  },
};

export const MockedSuccessButWorkflowLimitReturns500ForRetries: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(2000);
            return HttpResponse.json(getMockWorkflowList());
          },
        ),
        http.get(
          `${GEN3_API}/${GwasWorkflowEndpoint}`,
          async () => {
            await delay(3000);
            return new HttpResponse('error', {
            status: 500,
          });
          },
        ),
      ],
    },
  }
};
