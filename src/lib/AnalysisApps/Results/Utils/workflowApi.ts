import { gen3Api, GEN3_API, GEN3_FENCE_API } from '@gen3/core';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
const TAGS = 'GWASWorkflow';
export const GEN3_WORKFLOW_API =
  process.env.NEXT_PUBLIC_GEN3_WORLFLOW_API || `${GEN3_API}/ga4gh/wes/v2/`;

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

interface WorkflowArguments {
  parameters: WorkflowParameter[];
}

interface WorkflowOutputs {
  parameters: WorkflowParameter[];
}

interface WorkflowParameter {
  name: string;
  value: string;
  default?: string;
  enum?: string[];
}

interface WorkflowDetails {
  name: string;
  phase: string;
  gen3username: string;
  submittedAt: string;
  startedAt: string;
  finishedAt: string;
  wf_name: string;
  arguments: WorkflowArguments;
  progress: string;
  outputs: WorkflowOutputs;
  gen3teamproject: string;
}

export interface PresignedUrl {
  url: string;
}

export interface WorkflowMonthly {
  workflow_run:number;
  workflow_limit:number
}

// Requests Types

interface WorkflowDetailsRequest {
  workflowName: string;
  workflowUid: string;
}

interface PresignedUrlWorkflowArtifactRequest extends WorkflowDetailsRequest {
  artifactName: string;
}

export const getPresignedUrl = async (
  uid: string,
  fetchWithBQ: any,
  method: string = 'download',
) => {
  const response = await fetchWithBQ({
    url: `${GEN3_FENCE_API}/data/${method}/${uid}`,
  });
  if (response.error) {
    return { error: response.error as FetchBaseQueryError };
  }
  const data = { data: { url: response.data.url } };
  return data;
};

const workflowApi = ResultsApiTags.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowDetails: builder.query<WorkflowDetails, WorkflowDetailsRequest>({
      query: ({ workflowName, workflowUid }) =>
        `${GEN3_WORKFLOW_API}status/${workflowName}?uid=${workflowUid}`,
    }),
    getWorkflows: builder.query<WorkflowResponse, string>({
      query: (currentTeamProject) =>
        `${GEN3_WORKFLOW_API}workflows?team_projects=${currentTeamProject}`,
    }),
    getWorkflowsMonthly: builder.query<WorkflowMonthly, void>({
      query: () =>  `${GEN3_WORKFLOW_API}workflows/user-monthly`
    }),
    getPresignedUrlForWorkflowArtifact: builder.query<
      PresignedUrl,
      PresignedUrlWorkflowArtifactRequest
    >({
      async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
        const { artifactName, workflowName, workflowUid } = args;

        const workflowDetailsResponse = await fetchWithBQ({
          url: `${GEN3_WORKFLOW_API}status/${workflowName}?uid=${workflowUid}`,
          credentials: 'include',
        });

        if (workflowDetailsResponse.error) {
          return {
            error: workflowDetailsResponse.error as FetchBaseQueryError,
          };
        }

        const results = (
          workflowDetailsResponse.data as WorkflowDetails
        )?.outputs?.parameters.filter((entry) => entry.name === artifactName);
        if (!results || results.length !== 1) {
          return {
            error: {
              error: `Expected 1 artifact with name ${artifactName}, found: ${
                results?.length ?? 'undefined'
              }`,
              status: 'CUSTOM_ERROR',
            } as FetchBaseQueryError,
          };
        }

        const data = await getPresignedUrl(
          JSON.parse(results[0].value).did,
          fetchWithBQ,
          'download',
        );

        return data;
      },
    }),
  }),
});

export const {
  useGetWorkflowDetailsQuery,
  useGetWorkflowsQuery,
  useLazyGetWorkflowsQuery,
  useGetPresignedUrlForWorkflowArtifactQuery,
  useLazyGetPresignedUrlForWorkflowArtifactQuery,
  useGetWorkflowsMonthlyQuery
} = workflowApi;
