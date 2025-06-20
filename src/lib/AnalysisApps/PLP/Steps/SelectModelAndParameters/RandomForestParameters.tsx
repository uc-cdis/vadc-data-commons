import { TextInput, NumberInput, Checkbox, Select, Group, Box, Text, MultiSelect } from '@mantine/core';
import { ModelParamValues, ModelParametersUtils } from './ModelParametersUtils';
import CommaSeparatedNumberInput from './CommaSeparatedNumberInput';
import React from 'react';

interface RandomForestParametersProps {
  dispatch: (action: any) => void;
  model: string;
  modelParameters?: Record<string, any>;
}

// Constants: these MUST match EXACTLY the doc parameter names here: https://ohdsi.github.io/PatientLevelPrediction/reference/setRandomForest.html
const NUM_TREES = 'ntrees';
const CRITERION = 'criterion';
const MAX_DEPTH = 'maxDepth';
const MIN_SAMPLES_SPLIT = 'minSamplesSplit';
const MIN_SAMPLES_LEAF = 'minSamplesLeaf';
const MIN_WEIGHT_FRACTION_LEAF = 'minWeightFractionLeaf';
const MTRIES = 'mtries';
const MAX_LEAF_NODES = 'maxLeafNodes';
const MIN_IMPURITY_DECREASE = 'minImpurityDecrease';
const BOOTSTRAP = 'bootstrap';
const MAX_SAMPLES = 'maxSamples';
const OOB_SCORE = 'oobScore';
const CLASS_WEIGHT = 'classWeight';
const SEED = 'seed';

export function RandomForestParameters({ dispatch, model, modelParameters }: RandomForestParametersProps) {

  // Default initial values:
  const initialModelParameters: { [key: string]: ModelParamValues } = {
    [model]: {
      [NUM_TREES]: '100,500',
      [CRITERION]: ['gini'],
      [MAX_DEPTH]: '4,10,17',
      [MIN_SAMPLES_SPLIT]: 2,
      [MIN_SAMPLES_LEAF]: '1,10',
      [MIN_WEIGHT_FRACTION_LEAF]: 0.0,
      [MTRIES]: null,
      [MAX_LEAF_NODES]: null,
      [MIN_IMPURITY_DECREASE]: 0,
      [BOOTSTRAP]: true,
      [MAX_SAMPLES]: null,
      [OOB_SCORE]: false,
      [CLASS_WEIGHT]: null,
      [SEED]: 0,
    }
  };
  const utils = new ModelParametersUtils(initialModelParameters, dispatch, model, modelParameters);

  return (
    <div>
      <CommaSeparatedNumberInput
        label="Number of trees to build"
        value={utils.getValue(NUM_TREES)}
        onChange={val => utils.handleSetModelParameters(NUM_TREES, val)}
        required
        placeholder = 'e.g. 100,200,500 or just 100'
      />
      <MultiSelect
        label="Function to measure the quality of a split"
        placeholder="Select"
        value={utils.getValue(CRITERION) || []}
        onChange={(v) => utils.handleSetModelParameters(CRITERION, v)}
        data={[
          { value: 'gini', label: 'Gini impurity' },
          { value: 'entropy', label: 'Information gain' }
        ]}
      />
      <CommaSeparatedNumberInput
        label="Maximum tree depth (leave empty for unlimited)"
        tooltip={<>If empty, then nodes are expanded until all leaves are pure or
        until all leaves contain less than minSamplesSplit samples.
        You can provide a single number (e.g. 4) or a comma-separated list (e.g. 4,10,etc).
        When you provide a list, the model will run for each value, assess the results, and use the best one.
        </>}
        value={utils.getValue(MAX_DEPTH)}
        onChange={val => utils.handleSetModelParameters(MAX_DEPTH, val)}
        placeholder = 'e.g. 4,10,17 or just 4'
      />
      <NumberInput
        label="Minimum number of samples required to split an internal node"
        placeholder="e.g. 2"
        value={utils.getValue(MIN_SAMPLES_SPLIT)}
        onChange={(v) => utils.handleSetModelParameters(MIN_SAMPLES_SPLIT, v)}
        min={2}
      />
      <CommaSeparatedNumberInput
        label="Minimum number of samples required to be at a leaf node"
        tooltip={<>A split point at any depth will only be considered if it leaves at least minSamplesLeaf
        training samples in each of the left and right branches. This may have the effect of smoothing
        the model, especially in regression.
        You can provide a single number (e.g. 1) or a comma-separated list (e.g. 1,10,etc).
        When you provide a list, the model will run for each value, assess the results, and use the best one.
        </>}
        value={utils.getValue(MIN_SAMPLES_LEAF)}
        onChange={val => utils.handleSetModelParameters(MIN_SAMPLES_LEAF, val)}
        placeholder = 'e.g. 1,10,etc or just 1'
      />
      <NumberInput
        label="Minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node"
        placeholder="e.g. 0.0"
        value={utils.getValue(MIN_WEIGHT_FRACTION_LEAF)}
        onChange={(v) => utils.handleSetModelParameters(MIN_WEIGHT_FRACTION_LEAF, v)}
        min={0.0}
        max={0.9}
        step={0.01}
      />
      <Select
        label="The number of features to consider when looking for the best split "
        placeholder="Select"
        value={utils.getValue(MTRIES)}
        onChange={(v) => utils.handleSetModelParameters(MTRIES, v)}
        data={[
          { value: 'int', label: 'consider max_features features at each split' },
          { value: 'float', label: 'consider round(max_features * n_features) at each split' },
          { value: 'sqrt', label: 'consider max_features=sqrt(n_features)' },
          { value: 'log2', label: 'consider max_features=log2(n_features)' },
          { value: 'NULL', label: 'consider max_features=n_features' },
        ]}
      />
      <TextInput
        label="Maximum leaf nodes (grow trees with max_leaf_nodes in best-first fashion)"
        placeholder="e.g. 100"
        value={utils.getValue(MAX_LEAF_NODES)}
        onChange={(e) => utils.handleSetModelParameters(MAX_LEAF_NODES, e.target.value)}
      />
      <CommaSeparatedNumberInput
        label="Minimum impurity decrease"
        tooltip={<>A node will be split if this split induces a decrease of the impurity greater
        than or equal to this value.
        You can provide a single number (e.g. 0) or a comma-separated list (e.g. 0,1,etc).
        When you provide a list, the model will run for each value, assess the results, and use the best one.
        </>}
        value={utils.getValue(MIN_IMPURITY_DECREASE)}
        onChange={val => utils.handleSetModelParameters(MIN_IMPURITY_DECREASE, val)}
        placeholder = 'e.g. 0'
      />

      {/* START Bootstrap section */}
      <Checkbox
        mt="md"
        label="Use bootstrap samples when building trees (if not selected, the whole dataset is used to build each tree)"
        checked={!!utils.getValue(BOOTSTRAP)}
        onChange={(e) => utils.handleSetModelParameters(BOOTSTRAP, e.currentTarget.checked)}
      />
      {utils.getValue(BOOTSTRAP) && (
        <Box
          mt="md"
          p="md"
          style={{
            border: '1.5px solid rgb(198, 206, 213)',
            borderRadius: 8,
            background: 'rgb(243, 244, 247)',
          }}
        >
          <Group mb="xs">
            <Text size="sm">
              Bootstrap settings
            </Text>
          </Group>
          <TextInput
            label="Number of samples to draw from X to train each base estimator"
            placeholder="e.g. 0.9" //???
            value={utils.getValue(MAX_SAMPLES)}
            onChange={(e) => utils.handleSetModelParameters(MAX_SAMPLES, e.target.value)}
            mb="md"
          />
          <Checkbox
            label="Use out-of-bag samples to estimate generalization score"
            checked={!!utils.getValue(OOB_SCORE)}
            onChange={(e) => utils.handleSetModelParameters(OOB_SCORE, e.currentTarget.checked)}
          />
        </Box>
      )}
      {/* END Bootstrap section */}

      <Select
        label="Class weights (classWeight)"
        placeholder="Select"
        value={utils.getValue(CLASS_WEIGHT)}
        data={[
          { value: 'NULL', label: 'none' },
          { value: 'balanced', label: 'balanced' },
          { value: 'balanced_subsample', label: 'balanced_subsample' },
        ]}
        onChange={(v) => utils.handleSetModelParameters(CLASS_WEIGHT, v)}
        allowDeselect
      />
      <NumberInput
        label="A seed for the model"
        placeholder="e.g. 421"
        value={utils.getValue(SEED)}
        onChange={val => utils.handleSetModelParameters(SEED, val)}
        min={0}
        max={100000}
        step={1}
      />
    </div>
  );
}
