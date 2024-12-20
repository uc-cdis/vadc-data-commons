import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Loader } from '@mantine/core';
// import { Button, Modal, Spin } from 'antd';
import LoadingErrorMessage from '../../LoadingErrorMessage/LoadingErrorMessage';
import TeamsDropdown from './TeamsDropdown/TeamsDropdown';
import { useRouter } from 'next/router';
// import './TeamProjectModal.css';

const runningApplicationClientSide = typeof window !== 'undefined';

const TeamProjectModal = ({
  isModalOpen,
  setIsModalOpen,
  setBannerText,
  data,
  status,
  selectedTeamProject,
  setSelectedTeamProject,
}) => {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const closeAndUpdateTeamProject = () => {
    setIsModalOpen(false);
    setBannerText(selectedTeamProject);
    runningApplicationClientSide &&
      localStorage.setItem('teamProject', selectedTeamProject);
  };
  useEffect(() => {
    // non-editable view should redirect to app selection if user doesn't have a storedTeamProject
    redirect && router.push('/');
  }, [redirect]);
  const redirectToHomepage = () => {
    setRedirect(true);
  };

  if (status === 'error') {
    return (
      <Modal
        opened={isModalOpen}
        title="Team Projects"
        // closable={false}
        //  maskClosable={false}
        //  keyboard={false}
        //  footer={false}
      >
        <LoadingErrorMessage
          message={'Error while trying to retrieve user access details'}
        />
      </Modal>
    );
  }
  if (data) {
    if (data.teams.length > 0) {
      return (
        <Modal
          title="Team Projects"
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onCancel={() => setIsModalOpen(false)}
          // closable={localStorage.getItem('teamProject')}
          // maskClosable={localStorage.getItem('teamProject')}
          // keyboard={localStorage.getItem('teamProject')}
        >
          <div className="team-project-modal_modal-description">
            Please select your team.
          </div>
          <TeamsDropdown
            teams={data.teams}
            selectedTeamProject={selectedTeamProject}
            setSelectedTeamProject={setSelectedTeamProject}
          />
          <Button
            key="submit"
            type="primary"
            disabled={!selectedTeamProject}
            onClick={() => closeAndUpdateTeamProject()}
          >
            Submit
          </Button>
        </Modal>
      );
    }
    return (
      <Modal
        opened={isModalOpen}
        title="Team Projects"
        // closable={false}
        // maskClosable={false}
        // keyboard={false}
      >
        <div className="team-project-modal_modal-description">
          Please reach out to{' '}
          <a href="mailto:vadc@lists.uchicago.edu">vadc@lists.uchicago.edu</a>{' '}
          to gain access to the system
        </div>
        <Button key="submit" type="primary" onClick={redirectToHomepage}>
          Ok
        </Button>
      </Modal>
    );
  }
  return (
    <Modal
      open={isModalOpen}
      title="Team Projects"
      // closable={false}
      // maskClosable={false}
      // keyboard={false}
      // footer={false}
    >
      <div className="spinner-container">
        <Loader /> Retrieving the list of team projects.
        <br />
        Please wait...
      </div>
    </Modal>
  );
};

TeamProjectModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setBannerText: PropTypes.func.isRequired,
  data: PropTypes.object,
  status: PropTypes.string.isRequired,
  selectedTeamProject: PropTypes.string,
  setSelectedTeamProject: PropTypes.func.isRequired,
};
TeamProjectModal.defaultProps = {
  data: PropTypes.null,
  selectedTeamProject: PropTypes.null,
};
export default TeamProjectModal;
