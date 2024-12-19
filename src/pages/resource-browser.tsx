import React from 'react';
import { Card, Text, Image, Grid } from '@mantine/core';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';

import Link from 'next/link';

const ResourcesData = [
  {
    title: 'OHDSI Atlas',
    link: '/OHDSIAtlas',
    summary:
      'Use this App for cohort creation. These will be automatically populated in the Gen3 GWAS App',
    imageSrc: 'https://via.placeholder.com/200',
  },
  {
    title: 'Gen3 GWAS',
    link: '/GWASUIApp',
    summary:
      'Use this App to perform high throughput GWAS on Million Veteran Program (MVP) data, using the University of Washington Genesis pipeline',
    imageSrc: 'https://via.placeholder.com/200',
  },
  {
    title: 'GWAS Results',
    link: '/GWASResults',
    summary: 'Use this App to view status & results of submitted workflows',
    imageSrc: 'https://via.placeholder.com/200',
  },
  {
    title: 'MVP Data Dictionary',
    link: '/AtlasDataDictionary',
    summary:
      'Use this App to view a tabluar representation of the MVP data dictionary',
    imageSrc: 'https://via.placeholder.com/200',
  },
];

const Analysis = ({ headerProps, footerProps }: NavPageLayoutProps) => {
  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerData={{
        title: 'Resource Browser',
        content: 'Resource Browser',
        key: 'Resource Browser',
      }}
    >
      <div className="p-5">
        <h1 className="text-3xl pb-5 font-medium">Apps</h1>
        <Grid gutter="lg">
          {ResourcesData.map((resource) => (
            <Grid.Col key={resource.title} span={{ base: 12, md: 6, lg: 4 }}>
              <Link href={resource.link} passHref>
                <Card
                  className="w-full h-full flex flex-col"
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Text className="text-center pb-2" size="lg" mt="md">
                    {resource.title}
                  </Text>

                  <Text className="text-center flex-grow pb-4" size="sm">
                    {resource.summary}
                  </Text>
                  <Card.Section>
                    <Image
                      src={resource.imageSrc}
                      alt="Card image"
                      className="h-[200px]"
                    />
                  </Card.Section>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </NavPageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  NavPageLayoutProps
> = async () => {
  return {
    props: {
      ...(await getNavPageLayoutPropsFromConfig()),
    },
  };
};

export default Analysis;
