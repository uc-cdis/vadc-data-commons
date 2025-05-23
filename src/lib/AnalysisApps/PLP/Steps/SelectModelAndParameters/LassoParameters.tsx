import { NumberInput } from '@mantine/core';

interface LassoParametersProps {
  model?: string;
}

export function LassoParameters({ model }: LassoParametersProps) {
  return (
    <NumberInput
      label="A single value used as the starting value for the automatic lambda search(default = 0.01):"
      value={0.01}
      placeholder="Enter value"
      min={0}
    />
  );
}
