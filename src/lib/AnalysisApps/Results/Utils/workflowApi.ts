import { gen3Api, GEN3_API } from '@gen3/core';

const TAGS = 'GWASWorkflow';
export const GEN3_WORKFLOW_API =   process.env.NEXT_PUBLIC_GEN3_WORLFLOW_API || `${GEN3_API}/ga4gh/wes/v2/`;

export const ResultsApiTags = gen3Api.enhanceEndpoints({
  addTagTypes: [TAGS],
});

// Response Types

export interface WorkflowResponse {
  name: string;
  phase: string;
  gen3username: string;
  submittedAt: string; // ISO date string
  startedAt: string; // ISO date string
  finishedAt: string; // ISO date string
  wf_name: string;
  gen3teamproject: string;
  uid: string;
}

// Requests Types

interface WorkflowDetailsRequest {
  workflowName: string;
  workflowUid: string;
}

const workflowApi = ResultsApiTags.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowDetails: builder.query<
      Record<string, unknown>,
      WorkflowDetailsRequest
    >({
      query: ({
                workflowName,
                workflowUid
              }) =>
        `${GEN3_WORKFLOW_API}status/${workflowName}?uid=${workflowUid}`,
    }),
    getWorkflows: builder.query<
      WorkflowResponse,
      string
    >({
      query: (
                currentTeamProject,
              ) =>
        `${GEN3_WORKFLOW_API}workflows?team_projects=${currentTeamProject}`,
    }),
  }),
});

export const {
  useGetWorkflowDetailsQuery,
  useGetWorkflowsQuery
} =  workflowApi;
