import ACTIONS from './Actions';

export interface Action {
  type: string;
  payload?: any;
};

export interface State {
  selectedStudyPopulationCohort: Action['payload'];
  datasetObservationWindow: number;
  selectedOutcomeCohort: Action['payload'];
  outcomeObservationWindow: number;
  minimumCovariateOccurrence: number;
  useAllCovariates: boolean;
  currentStep: number;
  selectionMode: string;
  messages: any[];
  selectedTeamProject: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_STUDY_POPULATION_COHORT:
      return { ...state, selectedStudyPopulationCohort: action.payload };
    case ACTIONS.SET_SELECTED_OUTCOME_COHORT:
      return { ...state, selectedOutcomeCohort: action.payload };
    case ACTIONS.SET_DATASET_OBSERVATION_WINDOW:
      return { ...state, datasetObservationWindow: action.payload };
    case ACTIONS.SET_OUTCOME_OBSERVATION_WINDOW:
      return { ...state, outcomeObservationWindow: action.payload };
    case ACTIONS.SET_MINIMUM_COVARIATE_OCCURRENCE:
      return { ...state, minimumCovariateOccurrence: action.payload };
    case ACTIONS.SET_USE_ALL_COVARIATES:
      return { ...state, useAllCovariates: action.payload };
    case ACTIONS.INCREMENT_CURRENT_STEP:
      return { ...state, currentStep: state.currentStep + 1 };
    case ACTIONS.DECREMENT_CURRENT_STEP:
      return { ...state, currentStep: state.currentStep - 1 };
    case ACTIONS.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case ACTIONS.SET_SELECTION_MODE:
      return { ...state, selectionMode: action.payload };
    case ACTIONS.ADD_MESSAGE:
      if (!state.messages.find((element) => element === action.payload)) {
        return { ...state, messages: [...state.messages, action.payload] };
      }
      return state;
    case ACTIONS.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message !== action.payload,
        ),
      };
    default:
      throw new Error(`Unknown action passed to reducer: ${action}`);
  }
};

export default reducer;
