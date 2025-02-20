import React from 'react';
import { Center, Text, Paper } from '@mantine/core';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';
import GWASResultsContainer from '@/lib/AnalysisApps/GWASResults/GWASResultsContainer';

const GWASResults = ({ headerProps, footerProps }: NavPageLayoutProps) => {
  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerData={{
        title: 'Gen3 Sample Page',
        content: 'Sample Data',
        key: 'gen3-sample-page',
      }}
    >
      <div className="w-full m-10">
        <div className="w-full p-5">
          <GWASResultsContainer />
        </div>
      </div>
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
