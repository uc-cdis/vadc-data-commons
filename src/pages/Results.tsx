import React from 'react';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig, ProtectedContent,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';
import GWASResultsContainer from '@/lib/AnalysisApps/GWASResults/GWASResultsContainer';

const GWASResults = ({ headerProps, footerProps }: NavPageLayoutProps) => {

  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerMetadata={{
        title: 'Results',
        content: 'Results of Workflows',
        key: 'gen3-results',
      }}
    >
      <ProtectedContent>
        <div className="w-full p-10">
          <div className="w-full p-5">
            <GWASResultsContainer />
          </div>
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
