const initialState = {
  selectedStudyPopulationCohort: null,
  datasetObservationWindow: 0,
  selectedOutcomeCohort: null,
  outcomeObservationWindow: 0,
  minimumCovariateOccurrence: 0.1,
  useAllCovariates: true,
  // covariates: [],
  // imputationScore: 0.3,
  // mafThreshold: 0.01,
  // numOfPC: 3,
  // gwasName: '',
  // selectedHare: { concept_value: '' },
  currentStep: 0,
  finalPopulationSizes: [],
  selectionMode: '',
  messages: [],
  // selectedTeamProject: localStorage.getItem('teamProject'),
  selectedTeamProject: '',
};

export default initialState;
