// workflowApi.test.ts
import { waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '../../../test/test-utils';
import { GEN3_WORKFLOW_API, getPresignedUrl, useGetWorkflowDetailsQuery } from "./workflowApi";
const server = setupServer();


import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query';
import {
  describe,
  expect,
  it,
  afterEach,
  jest, beforeAll, beforeEach, afterAll,
} from '@jest/globals';
import { GEN3_FENCE_API } from '@gen3/core';

type MaybePromise<T> = T | Promise<T>;

interface FetchWithBQMockReturnType {
  data: { url: string; } | null;
  error: null | { message: string; status: number; };
}
type RTKQFetchFunction = (arg: (string | FetchArgs)) => MaybePromise<QueryReturnValue<FetchWithBQMockReturnType, FetchBaseQueryError, FetchBaseQueryMeta>>




describe('getPresignedUrl', () => {
  const fetchWithBQMock= jest.fn<RTKQFetchFunction>();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a presigned URL when the API call is successful', async () => {
    const mockUid = '12345';
    const mockMethod = 'download';
    const mockUrl = 'https://example.com/presigned-url';
    fetchWithBQMock.mockReturnValue({
      data: { url: mockUrl },
      error: null,
    });

    const result = await getPresignedUrl(mockUid, fetchWithBQMock, mockMethod);

    expect(fetchWithBQMock).toHaveBeenCalledWith({
      url: `${GEN3_FENCE_API}/data/${mockMethod}/${mockUid}`,
    });
    expect(result).toEqual({ data: { url: mockUrl } });
  });

  it('should return an error when the API call fails', async () => {
    const mockUid = '12345';
    const mockError = { message: 'API Error', status: 500 };
    fetchWithBQMock.mockResolvedValue({
      data: null,
      error: mockError,
    });

    const result = await getPresignedUrl(mockUid, fetchWithBQMock);

    expect(fetchWithBQMock).toHaveBeenCalledWith({
      url: `${GEN3_FENCE_API}/data/download/${mockUid}`,
    });
    expect(result).toEqual({ error: mockError });
  });

  it('should default to the "download" method if no method is provided', async () => {
    const mockUid = '12345';
    const mockUrl = 'https://example.com/presigned-url';
    fetchWithBQMock.mockResolvedValue({
      data: { url: mockUrl },
      error: null,
    });

    const result = await getPresignedUrl(mockUid, fetchWithBQMock);

    expect(fetchWithBQMock).toHaveBeenCalledWith({
      url: `${GEN3_FENCE_API}/data/download/${mockUid}`,
    });
    expect(result).toEqual({ data: { url: mockUrl } });
  });
});

describe('cohortApi', () => {
  beforeAll(() => {
    // Start the interception.
    server.listen();
  });
  beforeEach(() => {
  });

  afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers();
  });

  afterAll(() => {
    // Disable request interception and clean up.
    server.close();
  });

  it('test for getWorkflowDetails', async () => {

    const data = {
      name: 'gwas-workflow-6549599337',
      phase: 'Succeeded',
      gen3username: 'user922@example.com',
      submittedAt: '2024-12-02T04:20:07Z',
      startedAt: '2024-12-02T04:20:07Z',
      finishedAt: '2025-01-07T08:32:55Z',
      wf_name: 'test 1',
      arguments: {
        parameters: [
          {
            name: 'n_pcs',
            value: '3',
          },
          {
            name: 'variables',
            value: [
              {
                variable_type: 'concept',
                concept_id: 8852670911,
                concept_name: 'Eta Composite Score',
              },
              {
                variable_type: 'concept',
                concept_id: 5909884332,
                concept_name: 'Measurement Alpha Index',
              },
              {
                variable_type: 'concept',
                concept_id: 2505585697,
                concept_name: 'Zeta Coefficient',
              },
            ],
          },
          {
            name: 'out_prefix',
            default: 'genesis_vadc',
            value: '5262244486',
          },

        ],
      },
      progress: '1618/1620',
      outputs: {
        parameters: [
          {
            name: 'gwas_archive_index',
            value: {
              baseid: 'f0bed968-2dc8-48ad-92c6-cfcf902329dc',
              did: 'dg.TST0/2f0bed968-2dc8-48ad-92c6-cfcf902329dc',
              rev: 'ed3d2bcf',
            },
          },
        ],
      },
      gen3teamproject: '/research_projects/PROJECT_BETA',
    };


    server.use(
      http.get(`${GEN3_WORKFLOW_API}/status/123`, () => {
        return HttpResponse.json(data);
      }),
    );

    const { result } = renderHook(() => useGetWorkflowDetailsQuery({ workflowName: '123', workflowUid: '456'}));

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current).toMatchObject({
      isError: false,
      isFetching: false,
      isSuccess: true,
      isLoading: false,
      data: data,
    });
  });


  it('test for getWorkflowDetails error', async () => {
    server.use(
      http.get(`${GEN3_WORKFLOW_API}/status/123`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    const { result } = renderHook(() => useGetWorkflowDetailsQuery({ workflowName: '123', workflowUid: '456'}));

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isError).toBeTruthy());
    expect(result.current).toMatchObject({
      isError: true,
      isFetching: false,
      isSuccess: false,
      isLoading: false,
      error: { status: 500 },
    });
  });

});
