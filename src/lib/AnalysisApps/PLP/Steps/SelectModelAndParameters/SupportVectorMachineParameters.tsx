import { NumberInput, Checkbox, Select, MultiSelect, Tooltip, Input, ActionIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { ModelParamValues, ModelParametersUtils } from './ModelParametersUtils';
import CommaSeparatedNumberInput from './CommaSeparatedNumberInput';
import React from 'react';

interface SVMParametersProps {
  dispatch: (action: any) => void;
  model: string;
  modelParameters?: Record<string, any>;
}

// Constants for param names
const C_PARAM = 'C';
const KERNEL = 'kernel';
const DEGREE = 'degree';
const GAMMA = 'gamma';
const COEF0 = 'coef0';
const SHRINKING = 'shrinking';
const TOL = 'tol';
const CLASS_WEIGHT = 'classWeight';
const CACHE_SIZE = 'cacheSize';
const SEED = 'seed';

export function SupportVectorMachineParameters({ dispatch, model, modelParameters }: SVMParametersProps) {
  const initialModelParameters: { [key: string]: ModelParamValues } = {
    [model]: {
      [C_PARAM]: 1,
      [KERNEL]: ['rbf'],
      [DEGREE]: 3,
      [GAMMA]: 'scale',
      [COEF0]: 0,
      [SHRINKING]: true,
      [TOL]: 0.001,
      [CLASS_WEIGHT]: null,
      [CACHE_SIZE]: 500,
      [SEED]: 42,
    }
  };
  const utils = new ModelParametersUtils(initialModelParameters, dispatch, model, modelParameters);

  return (
    <div>
      <CommaSeparatedNumberInput
        label="C (Regularization parameter)"
        tooltip={<>Regularization parameter. The strength of the regularization is inversely proportional to C.
        Must be strictly positive. The penalty is a squared l2 penalty.
        You can provide a single number (e.g. 1) or a comma-separated list (e.g. 1,10,etc).
        When you provide a list, the model will run for each value, assess the results, and use the best one.
        </>}
        value={utils.getValue(C_PARAM)}
        onChange={val => utils.handleSetModelParameters(C_PARAM, val)}
        placeholder = 'e.g. 0.1,0.9,etc or just 0.1'
      />
      <MultiSelect
        label={
          <Input.Label>
            Kernel type to be used in the algorithm
            <Tooltip multiline withArrow withinPortal w="90vh"
              label={<>If none is given, RBF will be used. If multiple are selected, the model will run for each value,
              assess the results, and use the best one.</>}>
              <ActionIcon size="xs" variant="light" ml={5} tabIndex={-1}><IconQuestionMark size={15} /></ActionIcon>
            </Tooltip>
          </Input.Label>
        }
        placeholder="e.g. RBF"
        data={[
        { value: 'linear', label: 'Linear' },
        { value: 'poly', label: 'Polynomial' },
        { value: 'rbf', label: 'RBF (Radial Basis Function)' },
        { value: 'sigmoid', label: 'Sigmoid' },
        { value: 'precomputed', label: 'Precomputed' }
        ]}
        value={utils.getValue(KERNEL || [])}
        onChange={v => utils.handleSetModelParameters(KERNEL, v)}
        clearable
      />
      <MultiSelect
        label="Degree (for poly/rbf/sigmoid kernels)"
        data={['1', '3', '5']}
        value={(Array.isArray(utils.getValue(DEGREE)) ? utils.getValue(DEGREE) : [utils.getValue(DEGREE)]).map(String)}
        onChange={vals => utils.handleSetModelParameters(DEGREE, vals.map(Number))}
        clearable
      />
      <MultiSelect
        label="Gamma"
        data={[
          'scale',
          'auto',
          '1e-04',
          '3e-05',
          '0.001',
          '0.01',
          '0.25'
        ]}
        value={(Array.isArray(utils.getValue(GAMMA)) ? utils.getValue(GAMMA) : [utils.getValue(GAMMA)]).map(String)}
        onChange={vals => utils.handleSetModelParameters(GAMMA, vals.map(v => isNaN(Number(v)) ? v : Number(v)))}
        clearable
      />
      <MultiSelect
        label="Coef0 (only for poly/sigmoid)"
        data={['0']}
        value={(Array.isArray(utils.getValue(COEF0)) ? utils.getValue(COEF0) : [utils.getValue(COEF0)]).map(String)}
        onChange={vals => utils.handleSetModelParameters(COEF0, vals.map(Number))}
        clearable
      />
      <Checkbox
        mt="md"
        label="Use shrinking heuristic"
        checked={!!utils.getValue(SHRINKING)}
        onChange={e => utils.handleSetModelParameters(SHRINKING, e.currentTarget.checked)}
      />
      <NumberInput
        label="Tolerance (tol)"
        placeholder="e.g. 0.001"
        value={utils.getValue(TOL)}
        onChange={val => utils.handleSetModelParameters(TOL, val)}
        min={0}
        step={0.00001}
      />
      <Select
        label="Class weight"
        placeholder="e.g. balanced"
        data={[
          { value: '', label: 'None' },
          { value: 'balanced', label: 'Balanced' }
        ]}
        value={utils.getValue(CLASS_WEIGHT) ?? ''}
        onChange={val => utils.handleSetModelParameters(CLASS_WEIGHT, val || null)}
        clearable
      />
      <NumberInput
        label="Cache size (MB)"
        placeholder="e.g. 500"
        value={utils.getValue(CACHE_SIZE)}
        onChange={val => utils.handleSetModelParameters(CACHE_SIZE, val)}
        min={1}
        step={1}
      />
      <NumberInput
        label="Seed"
        placeholder="e.g. 42"
        value={utils.getValue(SEED)}
        onChange={val => utils.handleSetModelParameters(SEED, val)}
        min={0}
        max={100000}
        step={1}
      />
    </div>
  );
}
