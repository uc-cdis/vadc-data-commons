import { TextInput, NumberInput, Checkbox } from '@mantine/core';

interface RandomForestParametersProps {
  model?: string;
}

export function RandomForestParameters({ model }: RandomForestParametersProps) {
  return (
    <div>
      <TextInput
        label="Maximum number of interactions - a large value will lead to slow model training(default = 4,10,17):"
        placeholder="Enter value"
        value="4, 10, 17"
      />
      <NumberInput
        label="The number of features to include in each tree (-1 defaults to square root of total features)(default = -1):"
        value={-1}
        placeholder="Enter value"
        min={-1}
      />
      <NumberInput
        label="The number of trees to build(default = 500):"
        value={500}
        placeholder="Enter value"
        min={1}
      />
      <Checkbox
        mt="md"
        label="Perform an initial variable selection prior to fitting the model to select the useful variables(default = true):"
        checked={true}
        //onChange={(event) => handleUseAllCovariates(event.currentTarget.checked)}
      />
    </div>
  );
}
