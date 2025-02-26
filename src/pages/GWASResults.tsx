import React from 'react';
import { Center, Text, Paper } from '@mantine/core';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig, ProtectedContent,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';
import { useGetWorkflowsMonthlyQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

const GWASResults = ({ headerProps, footerProps }: NavPageLayoutProps) => {

  const {data,  isFetching: isFetchingMonthlyData } = useGetWorkflowsMonthlyQuery();

  console.log(data, isFetchingMonthlyData);
  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerData={{
        title: 'GWAS Results',
        content: 'Results of GWAS Workflows',
        key: 'gen3-gwas-results',
      }}
    >

      <ProtectedContent>
      <div className="w-full m-10">
        <Center>
          <Paper shadow="md" p="xl" withBorder>
            <h1>GWASResults</h1>
            <Text>This is a example custom page in Gen3</Text>
            <Text>You can add your own content here.</Text>
          </Paper>
        </Center>
      </div>
      </ProtectedContent>
    </NavPageLayout>
  );
};

// TODO: replace this with a custom getServerSideProps function
export const getServerSideProps: GetServerSideProps<
  NavPageLayoutProps
> = async () => {
  return {
    props: {
      ...(await getNavPageLayoutPropsFromConfig()),
    },
  };
};

export default GWASResults;
