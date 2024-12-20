import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import EditIcon from './Icons/EditIcon';
import isEnterOrSpace from '../../AccessibilityUtils/IsEnterOrSpace';
import TeamProjectModal from '../TeamProjectModal/TeamProjectModal';
import IsCurrentTeamProjectValid from './IsCurrentTeamProjectValid';
import useSWR from 'swr';
// import './TeamProjectHeader.css';

const runningApplicationClientSide = typeof window !== 'undefined';

const TeamProjectHeader = ({ isEditable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerText, setBannerText] = useState('- -');
  const [selectedTeamProject, setSelectedTeamProject] = useState(
    runningApplicationClientSide && localStorage.getItem('teamProject'),
  );
  const [redirect, setRedirect] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();

  const rerouteToAppSelectionIfNeeded = () => {
    if (
      !isEditable &&
      runningApplicationClientSide &&
      !localStorage.getItem('teamProject')
    ) {
      redirect === false && setRedirect(true);
    }
  };
  useEffect(() => {
    // non-editable view should redirect to app selection if user doesn't have a storedTeamProject
    redirect && router.push('/resource-browser');
  }, [redirect]);

  // SWR CODE
  const mockAPIEndpoint = 'http://localhost:3000/api/teamprojects';
  const { data, error, isLoading } = useSWR(mockAPIEndpoint, (...args) =>
    fetch(...args).then((res) => res.json()),
  );

  let currentTeamProjectIsValid = false;
  if (data) {
    currentTeamProjectIsValid = IsCurrentTeamProjectValid(data);
    if (!currentTeamProjectIsValid) {
      runningApplicationClientSide && localStorage.removeItem('teamProject');
      rerouteToAppSelectionIfNeeded();
    }
  }

  useEffect(() => {
    const storedTeamProject =
      runningApplicationClientSide && localStorage.getItem('teamProject');
    if (storedTeamProject) {
      setBannerText(storedTeamProject);
    } else if (isEditable) {
      setSelectedTeamProject(null);
      showModal();
    }
    rerouteToAppSelectionIfNeeded();
  }, [isEditable, currentTeamProjectIsValid, data]);

  console.log(
    'data ? data : error ? error : isLoading',
    data ? data : error ? 'error' : isLoading,
  );

  return (
    <div>
      <div className="team-project-header">
        <strong>Team Project</strong> / {bannerText}
        {isEditable && (
          <button
            className="team-project-header_modal-button"
            aria-label="Change Team Project"
            type="button"
            tabIndex="0"
            data-testid="team-project-edit"
            onClick={() => {
              showModal();
            }}
            onKeyDown={(e) => {
              if (isEnterOrSpace(e)) showModal();
            }}
          >
            <EditIcon />
          </button>
        )}
      </div>
      {isEditable && (
        <TeamProjectModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setBannerText={setBannerText}
          data={data}
          status={error ? 'error' : 'loading'}
          selectedTeamProject={selectedTeamProject}
          setSelectedTeamProject={setSelectedTeamProject}
        />
      )}
    </div>
  );
};

TeamProjectHeader.propTypes = {
  isEditable: PropTypes.bool,
};

TeamProjectHeader.defaultProps = {
  isEditable: false,
};

export default TeamProjectHeader;