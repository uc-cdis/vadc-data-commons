import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Spin, Button, Tooltip } from 'antd';
import SharedContext from '../../../Utils/SharedContext';
import { fetchPresignedUrlForWorkflowArtifact } from '../../../Utils/gwasWorkflowApi';
import queryConfig from '../../../../SharedUtils/QueryConfig';
import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
// import '../Results.css';

const ResultsPng = (artifactName) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const { selectedRowData } = useContext(SharedContext);
  const { name, uid } = selectedRowData;
  const { data, status } = useQuery(
    ['fetchPresignedUrlForWorkflowArtifact', name, uid, artifactName],
    () => fetchPresignedUrlForWorkflowArtifact(name, uid, artifactName),
    queryConfig,
  );

  const downloadPlot = () => {
    fetchPresignedUrlForWorkflowArtifact(name, uid, artifactName)
      .then((res) => {
        window.open(res, '_blank');
      })
      .catch((error) => {
        alert(`Could not download. \n\n${error}`);
      });
  };

  const displayTopSection = () => (
    <section className='results-top'>
      <div className='GWASResults-flex-row section-header'>
        <Button onClick={downloadPlot}>View Image in New Tab</Button>
      </div>
    </section>
  );

  if (status === 'error') {
    return (
      <React.Fragment>
        {displayTopSection()}
        <LoadingErrorMessage message='Error getting plot' />
      </React.Fragment>
    );
  }
  if (status === 'loading') {
    return (
      <React.Fragment>
        {displayTopSection()}
        <div className='spinner-container'>
          Fetching plot... <Spin />
        </div>
      </React.Fragment>
    );
  }

  if (!data) {
    return (
      <React.Fragment>
        {displayTopSection()}
        <LoadingErrorMessage message='Failed to load image, no image path' />
      </React.Fragment>
    );
  }

  const displaySpinnerWhileImageLoadsOrErrorIfItFails = () => {
    if (imageLoadFailed) {
      return (
        <LoadingErrorMessage message='Failed to load image, invalid image path' />
      );
    }
    if (imageLoaded) {
      return '';
    }
    return (
      <div className='spinner-container'>
        Loading... <Spin />
      </div>
    );
  };


  const isSafeImageSrc = (url) => {
    // some basic check of the url
    return (
      /^https?:\/\/.+/i.test(url) ||
      /^data:image\/(png|jpeg|gif|webp);base64,/.test(url)
    );
  }

  return (
    <div className='results-view'>
      {displayTopSection()}
      <section className='data-viz'>
        {isSafeImageSrc(data) && !imageLoadFailed (
          <Tooltip title='Right click and select “Save Image As” to download'>
            <img
              src={data}
              alt='Results plot'
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {
                setImageLoadFailed(true);
              }}
            />
          </Tooltip>
        )}
        {displaySpinnerWhileImageLoadsOrErrorIfItFails()}
      </section>
    </div>
  );
};
export default ResultsPng;
