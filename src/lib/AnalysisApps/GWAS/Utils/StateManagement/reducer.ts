import { addUniqueObjectToArray } from '../constants';
import ACTIONS from './Actions';

export interface Action {
  type: string;
  payload?: any;
};

export interface State {
  outcome: any;
  selectedStudyPopulationCohort: Action['payload'];
  covariates: any[];
  imputationScore: number;
  mafThreshold: number;
  numOfPC: number;
  gwasName: string;
  selectedHare: {
    concept_value: string;
  };
  currentStep: number;
  finalPopulationSizes: any[];
  selectionMode: string;
  messages: any[];
  selectedTeamProject: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_STUDY_POPULATION_COHORT:
      return { ...state, selectedStudyPopulationCohort: action.payload };
    case ACTIONS.INCREMENT_CURRENT_STEP:
      return { ...state, currentStep: state.currentStep + 1 };
    case ACTIONS.DECREMENT_CURRENT_STEP:
      return { ...state, currentStep: state.currentStep - 1 };
    case ACTIONS.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case ACTIONS.SET_OUTCOME:
      return { ...state, currentStep: 2, outcome: action.payload };
    case ACTIONS.ADD_COVARIATE:
      return {
        ...state,
        covariates: addUniqueObjectToArray(
          [...state.covariates],
          action.payload,
        ),
      };
    case ACTIONS.DELETE_COVARIATE:
      // Used to delete continuous covariates:
      if ('concept_id' in action.payload) {
        return {
          ...state,
          covariates: state.covariates.filter(
            (covariate) => covariate.concept_id !== action.payload.concept_id,
          ),
        };
      }
      // Used to delete dichotomous covariates:
      if ('provided_name' in action.payload) {
        return {
          ...state,
          covariates: state.covariates.filter(
            (covariate) =>
              covariate.provided_name !== action.payload.provided_name,
          ),
        };
      }
      // If neither continuous or dichotomous throw an error:
      throw new Error('Covariate Object missing needed key to delete');
    case ACTIONS.UPDATE_IMPUTATION_SCORE:
      return { ...state, imputationScore: action.payload };
    case ACTIONS.UPDATE_MAF_THRESHOLD:
      return { ...state, mafThreshold: action.payload };
    case ACTIONS.UPDATE_NUM_PCS:
      return { ...state, numPCs: action.payload };
    case ACTIONS.UPDATE_SELECTED_HARE:
      return { ...state, selectedHare: action.payload };
    case ACTIONS.UPDATE_FINAL_POPULATION_SIZES:
      return { ...state, finalPopulationSizes: action.payload };
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
