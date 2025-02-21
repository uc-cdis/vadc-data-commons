import { GEN3_API, gen3Api } from '@gen3/core';
import {
  BaseQueryFn,
  QueryDefinition,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  FetchArgs,
} from '@reduxjs/toolkit/query';
const TAGS = 'GWASWorkflow';
export const GEN3_WORKFLOW_API =
  process.env.NEXT_PUBLIC_GEN3_WORLFLOW_API || `${GEN3_API}/ga4gh/wes/v2`;

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
  workflow_run: number;
  workflow_limit: number;
}

// Requests Types

interface WorkflowDetailsRequest {
  workflowName: string;
  workflowUid: string;
}

interface PresignedUrlWorkflowArtifactRequest extends WorkflowDetailsRequest {
  artifactName: string;
  retrieveData?: boolean;
}

/**
 * Gets a presigned URL from Gen3 for an indexed file.
 *
 * @param {string} uid - The unique identifier of the file for which the presigned URL is to be retrieved.
 * @param {any} fetchWithBQ - A function used to perform the API call to fetch the presigned URL.
 * @param {string} [method='download'] - The file operation for which the URL is requested (e.g., 'download').
 * @returns {Promise<{data?: {url: string}, error?: FetchBaseQueryError}>} - A promise that resolves to an object containing either the generated presigned URL or an error.
 */
export const getPresignedUrl = async (
  uid: string,
  fetchWithBQ: any,
  method: string = 'download',
) => {
  const result = await fetchWithBQ({
    url: `${GEN3_API}/user/data/${method}/${uid}`, // TODO Replace with GEN3_FENCE_API
  });
  return result.data
    ? { data: result.data as PresignedUrl }
    : { error: result.error as FetchBaseQueryError };
};

export const getUrlData = async (url: string, fetchWithBQ: any) => {
  const response = await fetchWithBQ({
    url,
  });
  if (response.error) {
    return { error: response.error as FetchBaseQueryError };
  }
  return { data: response.data };
};

const workflowApi = ResultsApiTags.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowDetails: builder.query<WorkflowDetails, WorkflowDetailsRequest>({
      query: ({ workflowName, workflowUid }) =>
        `${GEN3_WORKFLOW_API}/status/${workflowName}?uid=${workflowUid}`,
    }),
    getWorkflows: builder.query<WorkflowResponse, string>({
      query: (currentTeamProject) =>
        `${GEN3_WORKFLOW_API}/workflows?team_projects=${currentTeamProject}`,
    }),
    getWorkflowsMonthly: builder.query<WorkflowMonthly, void>({
      query: () => `${GEN3_WORKFLOW_API}/workflows/user-monthly`,
    }),
    getPresignedUrlOrDataForWorkflowArtifact: builder.query({
      async queryFn(
        args: PresignedUrlWorkflowArtifactRequest,
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        const { artifactName, workflowName, workflowUid, retrieveData } = args;

        const workflowDetailsResponse = await fetchWithBQ({
          url: `${GEN3_WORKFLOW_API}/status/${workflowName}?uid=${workflowUid}`,
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

        let parsedValue;
        try {
          parsedValue = JSON.parse(results[0].value);
          if (!parsedValue?.did) {
            throw new Error(`Missing "did" field in artifact value.`);
          }
        } catch (_error: unknown) {
          return {
            error: {
              error: 'Failed to parse artifact value or missing "did"',
              status: 'CUSTOM_ERROR',
            } as FetchBaseQueryError,
          };
        }

        const presignedUrl = await getPresignedUrl(
          parsedValue.did,
          fetchWithBQ,
        );

        if (!retrieveData || presignedUrl.data?.url === undefined)
          return presignedUrl;

        return await getUrlData(presignedUrl.data.url, fetchWithBQ);
      },
    }),
  }),
});

export const {
  useGetWorkflowDetailsQuery,
  useGetWorkflowsQuery,
  useLazyGetWorkflowsQuery,
  useGetPresignedUrlOrDataForWorkflowArtifactQuery,
  useLazyGetPresignedUrlOrDataForWorkflowArtifactQuery,
  useGetWorkflowsMonthlyQuery,
} = workflowApi;
