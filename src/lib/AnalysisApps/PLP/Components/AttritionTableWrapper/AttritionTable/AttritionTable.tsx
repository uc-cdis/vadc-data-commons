import React from 'react';
import useSWR from 'swr';
import { Table, Loader, Center, Text } from '@mantine/core';

interface AttritionTableProps {
  dataset1: string;
  dataset2: string;
  days1: number;
  days2: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DataCell({ url }: { url: string }) {
  const { data, error, isLoading } = useSWR(url, fetcher,  {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) {
    return (
      <Center>
        <Loader size="xs" />
      </Center>
    );
  }

  if (error) {
    return <Text c="red" size="xs">Error</Text>;
  }

  return <Text ta="right">{data?.value ?? '—'}</Text>;
}

export const AttritionTable: React.FC<AttritionTableProps> = ({
  dataset1,
  dataset2,
  days1,
  days2,
}) => {
  // These would realistically be dynamic or based on filters / team-project
  const getUrl = (step: number, type: 'total' | 'with' | 'without', dataset: string) =>
    `/api/attrition?step=${step}&type=${type}&dataset=${dataset}`;

  return (
    <Table
        striped
        withTableBorder
        withColumnBorders
        highlightOnHover
    >
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Step</th>
          <th>Filter Applied</th>
          <th>Training set</th>
          <th>With outcome</th>
          <th>Without outcome</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Initial data cohort</td>
          <td><DataCell url={getUrl(1, 'total', dataset1)} /></td>
          <td><DataCell url={getUrl(1, 'with', dataset1)} /></td>
          <td><DataCell url={getUrl(1, 'without', dataset1)} /></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Dataset observation window ({days1} days)</td>
          <td><DataCell url={getUrl(2, 'total', dataset1)} /></td>
          <td><DataCell url={getUrl(2, 'with', dataset1)} /></td>
          <td><DataCell url={getUrl(2, 'without', dataset1)} /></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Outcome observation window (time-at-risk) ({days2} days)</td>
          <td><DataCell url={getUrl(4, 'total', dataset2)} /></td>
          <td><DataCell url={getUrl(4, 'with', dataset2)} /></td>
          <td><DataCell url={getUrl(4, 'without', dataset2)} /></td>
        </tr>
      </tbody>
    </Table>
  );
};
