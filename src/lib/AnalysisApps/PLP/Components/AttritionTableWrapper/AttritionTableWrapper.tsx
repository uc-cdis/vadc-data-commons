import React, { useState } from 'react';
import { AttritionTable } from './AttritionTable/AttritionTable';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import isEnterOrSpace from '@/lib/AnalysisApps/SharedUtils/AccessibilityUtils/IsEnterOrSpace';

interface AttritionTableWrapperProps {
  selectedStudyPopulationCohort: cohort;
  datasetObservationWindow: number;
  selectedOutcomeCohort: cohort;
  outcomeObservationWindow: number;
}

interface cohort { // TODO - centralize this interface
  cohort_definition_id: number;
  cohort_name: string;
  size: number;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const AttritionTableWrapper: React.FC<AttritionTableWrapperProps> = ({
  selectedStudyPopulationCohort,
  datasetObservationWindow,
  selectedOutcomeCohort,
  outcomeObservationWindow,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleArrow = () => setIsOpen((prev) => !prev);

  return (
    <div data-tour="attrition-table">
      <button
        className="bg-vadc-tertiary my-5 text-sm cursor-pointer hover:bg-vadc-tertiary select-none w-full text-left appearance-none border-none p-0"
        type="button"
        tabIndex={0}
        onClick={toggleArrow}
        onKeyDown={(e) => (isEnterOrSpace(e) ? toggleArrow() : null)}
      >
        <div className="p-3 flex">
          <span className="flex justify-center h-4 mr-3 text-white w-4 bg-vadc-secondary rounded-full ">
            {isOpen ? (
              <IconChevronUp size={16} />
            ) : (
              <IconChevronDown size={16} />
            )}
          </span>
          <span> Attrition Table</span>
        </div>
        <div
          className={`bg-vadc-slate_blue pl-4 overflow-hidden transition-all duration-1000 ease-in-out ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          {isOpen ? <div className="pl-4 py-10">
            <AttritionTable
              selectedStudyPopulationCohort={selectedStudyPopulationCohort}
              datasetObservationWindow={datasetObservationWindow}
              selectedOutcomeCohort={selectedOutcomeCohort}
              outcomeObservationWindow={outcomeObservationWindow}
              />
          </div> : null}
        </div>{' '}
      </button>

    </div>
  );
};

export default AttritionTableWrapper;
