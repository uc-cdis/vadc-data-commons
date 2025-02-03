import type { Meta, StoryObj } from '@storybook/react';
import {http, HttpResponse } from 'msw';
import { useTeamProjects } from './teamProjectHooks';
import { GEN3_AUTHZ_API, CoreProvider } from '@gen3/core';
import React from 'react';

type Story = StoryObj<typeof useTeamProjects>;



const TeamProjectsHook = () => {
  const { teams, isFetching, isSuccess, isError } = useTeamProjects();

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (isSuccess)
    return (
      <ul>
        {teams.map((team) => (
          <li key={team.teamName}>{team.teamName}</li>
        ))}
      </ul>
    );
};

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${GEN3_AUTHZ_API}/mapping`, () => {
          return HttpResponse.json({
            '/gwas_projects/project1': [{ abc: 'def' }],
            '/gwas_projects/project2': [
              { abc: 'def' },
              {
                service: 'atlas-argo-wrapper-and-cohort-middleware',
                method: 'access',
              },
            ],
            '/other/project3': [{ abc: 'def' }],
          });
        }),
      ],
    },
  },
  render: () => <TeamProjectsHook />, // see https://storybook.js.org/docs/writing-stories
};
;

const meta: Meta<typeof useTeamProjects> = {
  title: 'useTeamProjects',
  component: TeamProjectsHook,
  decorators: [
    (Story) => {
      return (
        <CoreProvider
        >
          <Story />
        </CoreProvider>
      );
    },
  ],
};

export default meta;
