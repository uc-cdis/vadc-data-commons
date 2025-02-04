import { gen3Api, GEN3_API} from '@gen3/core';

const TAGS = 'GWASApp';
export const GEN3_COHORT_MIDDLEWARE_API = `${GEN3_API}/cohort-middleware`;

const hareConceptId = 2000007027;

export const gwasCohortApiTags = gen3Api.enhanceEndpoints({
  addTagTypes: [TAGS],
});

// Types for API calls

interface CohortDefinitionQueryParams {
  sourceId: string;
  selectedTeamProject: string;
}

export interface GWASCohortDefinition {
  cohort_definition_id: number;
  cohort_name: string;
  size: number;
}

export interface GWASCohortDefinitionResponse {
  cohort_definitions_and_stats: Array<GWASCohortDefinition>;
}

interface SourcesResponse {
   sources: Array<{source_id: string, source_name: string}>
}

export const gwasCohortApi = gwasCohortApiTags.injectEndpoints({
  endpoints: (builder) => ({


    getCohortDefinitions: builder.query<GWASCohortDefinitionResponse, CohortDefinitionQueryParams>({
      query: ({
                sourceId,
                selectedTeamProject
              }) => `${GEN3_COHORT_MIDDLEWARE_API}/cohortdefinition-stats/by-source-id/${sourceId}/by-team-project?team-project=${selectedTeamProject}`,
      transformResponse: (response: Record<string, never>) => {
        // confirm data is valid
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response format');
        }
        if (!('cohort_definitions_and_stats' in response)) {
          throw new Error('Missing field cohort_definitions_and_stats');
        }
        return { cohort_definitions_and_stats: response.cohort_definitions_and_stats };
      },
    }),
    getSources: builder.query< SourcesResponse, void> ({
      query: () => `${GEN3_COHORT_MIDDLEWARE_API}/sources`,
    }),
    getSourceId: builder.query<string, void> ({
      query: () => `${GEN3_COHORT_MIDDLEWARE_API}/sources`,
      transformResponse: (response: SourcesResponse) => {
        if (Array.isArray(response?.sources) && response.sources.length === 1) {
          return response.sources[0].source_id;
        } else {
          const message = `Data source received in an invalid format:
        ${JSON.stringify(response?.sources)}`;
          throw new Error(message);
        }
      }
    })
  }),
});


export const {
  useGetCohortDefinitionsQuery,
  useGetSourcesQuery,
  useGetSourceIdQuery,
} = gwasCohortApi;
