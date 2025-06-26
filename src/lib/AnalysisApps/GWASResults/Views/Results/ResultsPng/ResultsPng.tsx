import React, { useContext, useState } from 'react';
import useSWR from 'swr';
import { Loader, Button, Tooltip } from '@mantine/core';
import SharedContext from '../../../Utils/SharedContext';
import { fetchPresignedUrlForWorkflowArtifact } from '../../../Utils/gwasWorkflowApi';
import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';

interface ResultsPngProps {
  artifactName: string;
}

const ResultsPng: React.FC<ResultsPngProps> = ({ artifactName }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;

  type PresignedUrlType = string;
  const fetcher = (
    [_key, name, uid, artifactName]: [string, string, string, string]
  ): Promise<PresignedUrlType> =>
    fetchPresignedUrlForWorkflowArtifact(name, uid, artifactName);

  const { data, error, isLoading, isValidating } = useSWR<PresignedUrlType, Error>(
    ['fetchPresignedUrlForWorkflowArtifact', name, uid, artifactName],
    fetcher
    // , options // optional
  );

  const downloadPlot = () => {
    fetchPresignedUrlForWorkflowArtifact(name, uid, artifactName)
      .then((res: string) => {
        window.open(res, '_blank');
      })
      .catch((error: Error) => {
        alert(`Could not download. \n\n\${error}`);
      });
  };

  const displayTopSection = () => (
    <section className='results-top'>
      <div className='GWASResults-flex-row section-header'>
        <Button onClick={downloadPlot} variant="outline">
          View Image in New Tab
        </Button>
      </div>
    </section>
  );

  if (error) {
    return (
      <>
        {displayTopSection()}
        <LoadingErrorMessage message='Error getting plot' />
      </>
    );
  }
  if (isLoading || isValidating) {
    return (
      <>
        {displayTopSection()}
        <div className='spinner-container'>
          Fetching plot... <Loader size="sm" />
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        {displayTopSection()}
        <LoadingErrorMessage message='Failed to load image, no image path' />
      </>
    );
  }

  const displaySpinnerWhileImageLoadsOrErrorIfItFails = () => {
    if (imageLoadFailed) {
      return (
        <LoadingErrorMessage message='Failed to load image, invalid image path' />
      );
    }
    if (imageLoaded) {
      return null;
    }
    return (
      <div className='spinner-container'>
        Loading... <Loader size="sm" />
      </div>
    );
  };

  const isSafeImageSrc = (url: string) => {
    return (
      /^https?:\/\/.+/i.test(url) ||
      /^data:image\/(png|jpeg|gif|webp);base64,/.test(url)
    );
  };

  return (
    <div className='results-view'>
      {displayTopSection()}
      <section className='data-viz'>
        {isSafeImageSrc(data) && !imageLoadFailed && (
          <Tooltip label='Right click and select “Save Image As” to download'>
            <img
              // snyk-code-ignore
              // reason: src attribute is validated by isSafeImageSrc; false positive for DOMXSS
              src={data}
              alt='Results plot'
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoadFailed(true)}
            />
          </Tooltip>
        )}
        {displaySpinnerWhileImageLoadsOrErrorIfItFails()}
      </section>
    </div>
  );
};

export default ResultsPng;
