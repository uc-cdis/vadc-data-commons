import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DismissibleMessage.module.css';
import isEnterOrSpace from '../AccessibilityUtils/IsEnterOrSpace';

const DismissibleMessage = ({
  title = 'Placeholder Title',
  description = 'placeholder description',
  messageType = 'success',
}) => {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {open === true && (
        <div className={styles[`dismissable_message_${messageType}`]}>
          <span
            className={styles.dismissable_message_close}
            tabIndex='0'
            role='button'
            aria-label='Close Message'
            onClick={close}
            onKeyDown={(e) => {
              if (isEnterOrSpace(e)) close();
            }}
          >
            X
          </span>
          <div>{title}</div>
          <div className={styles.dismissable_message_description}>{description}</div>
        </div>
      )}
    </React.Fragment>
  );
};

DismissibleMessage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  messageType: PropTypes.string,
};

DismissibleMessage.defaultProps = {
  description: '',
  messageType: 'success',
};

export default DismissibleMessage;
