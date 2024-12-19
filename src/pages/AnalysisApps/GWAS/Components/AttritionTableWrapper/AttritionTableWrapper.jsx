import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import AttritionTable from './AttritionTable/AttritionTable';
// import AttritionTableModal from './AttritionTableModal/AttritionTableModal';
import { Button } from '@mantine/core';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';

const AttritionTableWrapper = ({ covariates, selectedCohort, outcome }) => {
  /* const useSecondTable = outcome?.variable_type === 'custom_dichotomous';

  const [modalInfo, setModalInfo] = useState({
    title: '',
    isModalOpen: false,
    selectedCohort: null,
    currentCovariateAndCovariatesFromPrecedingRows: null,
    outcome: null,
    rowObject: null,
  });
  */
  /*
  // Keep modal info up-to-date with changes in the data needed for data viz
  useEffect(() => {
    setModalInfo({
      ...modalInfo,
      selectedCohort,
      outcome,
    });
  }, [selectedCohort, covariates, outcome]);
  */

  const [isOpen, setIsOpen] = useState(false);
  const toggleArrow = () => setIsOpen((prev) => !prev);

  return (
    <div data-tour="attrition-table">
      <div
        className="bg-vadc-tertiary  my-5 text-sm cursor-pointer hover:bg-vadc-tertiary select-none"
        role="button"
        tabIndex={1}
        onClick={toggleArrow}
      >
        <div className="p-3 flex">
          <span
            color="#2e77b8"
            radius="50%"
            className="flex justify-center h-4 mr-3 text-white w-4 bg-vadc-secondary rounded-full "
          >
            {isOpen ? (
              <IconChevronUp size={16} />
            ) : (
              <IconChevronDown size={16} />
            )}
          </span>
          <span> Attrition Table</span>
        </div>
        {isOpen ? (
          <div className="bg-vadc-slate_blue pl-4 py-10">Table content</div>
        ) : null}
      </div>

      {/*  <AttritionTableModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
      <AttritionTable
        covariates={covariates}
        selectedCohort={selectedCohort}
        outcome={outcome}
        tableType={useSecondTable ? 'Case Cohort' : ''}
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
      />
      {useSecondTable && (
        <AttritionTable
          covariates={covariates}
          selectedCohort={selectedCohort}
          outcome={outcome}
          tableType={'Control Cohort'}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      )} */}
    </div>
  );
};
AttritionTableWrapper.propTypes = {
  selectedCohort: PropTypes.object,
  outcome: PropTypes.object,
  covariates: PropTypes.array.isRequired,
};

AttritionTableWrapper.defaultProps = {
  selectedCohort: null,
  outcome: null,
};
export default AttritionTableWrapper;
