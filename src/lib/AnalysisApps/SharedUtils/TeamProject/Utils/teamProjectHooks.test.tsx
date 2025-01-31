// teamProjectHooks.test.ts
import { renderHook } from '@testing-library/react';
import { useTeamProjects } from './teamProjectHooks';
import { useGetAuthzMappingsQuery } from '@gen3/core';
import { describe, expect, it, jest } from '@jest/globals';

describe('useTeamProjects', () => {
  it('should return loading state when data is fetching', () => {
    (useGetAuthzMappingsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isSuccess: false,
      isError: false,
    });

    const { result } = renderHook(() => useTeamProjects());
    expect(result.current).toEqual({
      teams: { teams: [] },
      isFetching: true,
      isSuccess: false,
      isError: false,
    });
  });

  it('should return formatted team projects when data is successfully retrieved', () => {
    (useGetAuthzMappingsQuery as jest.Mock).mockReturnValue({
      data: {
        '/gwas_projects/team1': [
          { service: 'atlas-argo-wrapper-and-cohort-middleware' },
        ],
        '/gwas_projects/team2': [
          { service: 'atlas-argo-wrapper-and-cohort-middleware' },
          { service: 'other-service' },
        ],
        '/other_path/team3': [
          { service: 'atlas-argo-wrapper-and-cohort-middleware' },
        ],
      },
      isFetching: false,
      isSuccess: true,
      isError: false,
    });

    const { result } = renderHook(() => useTeamProjects());
    expect(result.current).toEqual({
      teams: {
        teams: [{ teamName: '/gwas_projects/team1' }, { teamName: '/gwas_projects/team2' }],
      },
      isFetching: false,
      isSuccess: true,
      isError: false,
    });
  });

  it('should return an empty list when no valid authorization mappings exist', () => {
    (useGetAuthzMappingsQuery as jest.Mock).mockReturnValue({
      data: {
        '/gwas_projects/team1': [{ service: 'other-service' }],
        '/other_path/team2': [
          { service: 'atlas-argo-wrapper-and-cohort-middleware' },
        ],
      },
      isFetching: false,
      isSuccess: true,
      isError: false,
    });

    const { result } = renderHook(() => useTeamProjects());
    expect(result.current).toEqual({
      teams: { teams: [] },
      isFetching: false,
      isSuccess: true,
      isError: false,
    });
  });

  it('should return error state when there is an error in fetching data', () => {
    (useGetAuthzMappingsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isSuccess: false,
      isError: true,
    });

    const { result } = renderHook(() => useTeamProjects());
    expect(result.current).toEqual({
      teams: { teams: [] },
      isFetching: false,
      isSuccess: false,
      isError: true,
    });
  });
});
