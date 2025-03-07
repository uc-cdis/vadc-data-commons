import { isEqual } from 'lodash';

export const GWASAppSteps = [
  {
    title: 'Select Study Population',
  },
  {
    title: 'Select Outcome Phenotype',
  },
  {
    title: 'Select Covariate Phenotype',
  },
  {
    title: 'Configure GWAS',
  },
];

export const MESSAGES = {
  OVERLAP_ERROR: {
    title:
      'One or more groups have no overlap with the (remaining) population of any of the other groups',
    messageType: 'warning',
  },
  NO_BINS_ERROR: {
    title:
      'None of the persons in the (remaining) population have a value for the selected concept',
    messageType: 'warning',
  },
  SMALL_COHORT_CAUTION: {
    title:
      'The total cohort size is small and can lead to low statistical power or cause the GWAS model to fail. Use caution when submitting to minimize computational resource usage.',
    messageType: 'caution',
  },
  SMALL_CONTROL_OR_CASE_CAUTION: {
    title:
      'The total cohort size of either your case or control groups that you have chosen is small and can lead to low statistical power or cause the GWAS model to fail. Use caution when submitting to minimize computational resource usage.',
    messageType: 'caution',
  },
  ZERO_SIZE_WARNING: {
    title: 'Error, selected group has size 0 in case or control groups.',
    messageType: 'warning',
  },
};

const minimumRecommendedCohortSize = 1000;
export const checkFinalPopulationSizes = (finalPopulationSizes) => {
  let hasSizeIssue = false;
  finalPopulationSizes.forEach((obj) => {
    if (obj?.size < minimumRecommendedCohortSize) {
      hasSizeIssue = true;
    }
  });
  return hasSizeIssue;
};

export const checkFinalPopulationSizeZero = (finalPopulationSizes) => {
  let hasZeroSizeIssue = false;
  // If any of the values in finalPopulationSizes: case, control or total are zero return true
  finalPopulationSizes.forEach((obj) => {
    if (obj?.size === 0) {
      hasZeroSizeIssue = true;
    }
  });
  return hasZeroSizeIssue;
};

export const addUniqueObjectToArray = (currArray, newObj) => {
  if (
    !Array.isArray(currArray) ||
    typeof newObj !== 'object' ||
    newObj === null
  ) {
    throw new TypeError('addUniqueObjectToArray recieved invalid parameters');
  }
  const isUnique = !currArray.some((obj) => isEqual(obj, newObj));
  if (isUnique) {
    currArray.push(newObj);
  }
  return currArray;
};
