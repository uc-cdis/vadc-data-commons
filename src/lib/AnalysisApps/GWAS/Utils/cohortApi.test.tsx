import { waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from '@jest/globals';
import { renderHook } from '../../../test/test-utils';

import {
  GEN3_COHORT_MIDDLEWARE_API,
  useGetCohortDefinitionsQuery,
  useGetSourcesQuery
} from './cohortApi';

const server = setupServer();

const cohortDefinitionAndStatsData = {
  cohort_definitions_and_stats: [
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
  ]};

describe('cohortApi', () => {
  beforeAll(() => {
    // Start the interception.
    server.listen();
  });
  beforeEach(() => {});

  afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers();
  });

  afterAll(() => {
    // Disable request interception and clean up.
    server.close();
  });

  it('fetches and returns cohort definitions successfully', async () => {
    const sourceId = '1234567890';
    const selectedTeamProject = 'project2';

    server.use(
      http.get(
        `${GEN3_COHORT_MIDDLEWARE_API}/cohortdefinition-stats/by-source-id/1234567890/by-team-project`,
        ({ request }) => {
          const url = new URL(request.url);
          const project = url.searchParams.get('team-project');
          if (project !== 'project2') {
            return new HttpResponse(null, {
              status: 403,
            });
          }
          return HttpResponse.json(cohortDefinitionAndStatsData);
        },
      ),
    );

    const { result } = renderHook(() =>
      useGetCohortDefinitionsQuery({ sourceId, selectedTeamProject }),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current).toMatchObject({
      isError: false,
      isFetching: false,
      isSuccess: true,
      isLoading: false,
      data: cohortDefinitionAndStatsData,
    });
  });

  it('returns error if project id not accessible ', async () => {

    const sourceId = '1234567890';
    const selectedTeamProject = 'project2345';

    server.use(
      http.get(
        `${GEN3_COHORT_MIDDLEWARE_API}/cohortdefinition-stats/by-source-id/1234567890/by-team-project`,
        () => {
            return new HttpResponse(null, {
              status: 403,
            });
        },
      ),
    );

    const { result } = renderHook(() =>
      useGetCohortDefinitionsQuery({ sourceId, selectedTeamProject }),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isError).toBeTruthy());
    expect(result.current).toMatchObject({
      isError: true,
      isFetching: false,
      isSuccess: false,
      isLoading: false,
      error: { status: 403}
    });
  });

  it('test for successful useGetSources ', async () => {
    const data = {"sources":[{"source_id":123,"source_name":"MVP-batch19000101"}]};
    server.use(
      http.get(
        `${GEN3_COHORT_MIDDLEWARE_API}/sources`,
        () => {
          return HttpResponse.json(data);
        },
      ),
    );

    const { result } = renderHook(() =>
      useGetSourcesQuery(),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current).toMatchObject({
      isError: false,
      isFetching: false,
      isSuccess: true,
      isLoading: false,
      data: data
    });
  });
});
