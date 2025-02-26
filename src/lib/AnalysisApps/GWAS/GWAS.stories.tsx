import React, { useState, useReducer } from 'react';
import GWASContainer from './GWASContainer';

import { Meta, StoryObj } from '@storybook/react';
 
 
const meta: Meta<typeof GWASContainer> = {
  title: 'GWASAPP',
  component: GWASContainer,
};
 
export default meta;
type Story = StoryObj<typeof GWASContainer>;
 
 
export const Mock: Story = {
  render: () => <GWASContainer />,
};
