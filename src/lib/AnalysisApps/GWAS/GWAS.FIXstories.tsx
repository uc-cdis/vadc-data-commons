import React from 'react';
import GWASContainer from './GWASContainer';

import { Meta, StoryObj } from '@storybook/nextjs';


const meta: Meta<typeof GWASContainer> = {
  title: 'GWASAPP',
  component: GWASContainer,
  parameters: { // TODO remove this and fix accessibility
    a11y: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GWASContainer>;


export const Mock: Story = {
  render: () => <GWASContainer />,
};
