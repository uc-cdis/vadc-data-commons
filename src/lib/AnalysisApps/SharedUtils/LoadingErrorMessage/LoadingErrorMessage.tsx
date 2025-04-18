import React from 'react';
import PropTypes from 'prop-types';

type LoadingErrorMessageProps = {
  message: string;
};
const LoadingErrorMessage = ({ message }: LoadingErrorMessageProps) => (
  <h2 className="loading-error-message" data-testid="loading-error-message">
    ❌ {message}
  </h2>
);

LoadingErrorMessage.propTypes = {
  message: PropTypes.string,
};
LoadingErrorMessage.defaultProps = {
  message: 'Error loading data for table',
};

export default LoadingErrorMessage;
