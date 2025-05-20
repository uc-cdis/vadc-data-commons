import React, { useEffect, useState } from 'react';
import { Table, Loader } from '@mantine/core';
import { CohortsEndpoint, CohortsOverlapEndpoint } from '@/lib/AnalysisApps/SharedUtils/Endpoints';
import { useSourceContext } from '../../../../SharedUtils/Source';

interface AttritionTableProps {
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

type Key = 'A1' | 'B1' | 'C1' | 'A2' | 'B2' | 'C2' | 'A3' | 'B3' | 'C3';
type ValueMap = Record<Key, number | null>;
type LoadingMap = Record<Key, boolean>;
const ComputeError = 1;

const cellKeys: Key[][] = [
  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],
];

const descriptions = [
  'Initial data cohort',
  'Observation window (365 days)',
  'Time-at-risk (90 days)',
];

export const AttritionTable: React.FC<AttritionTableProps> = ({
  selectedStudyPopulationCohort,
  datasetObservationWindow,
  selectedOutcomeCohort,
  outcomeObservationWindow,
}) => {
  const { sourceId } = useSourceContext();

  const getOverlapWithOutcome = async () => {
    if (! (selectedStudyPopulationCohort && selectedOutcomeCohort) ) {
      return null;
    }
    const endpoint = CohortsOverlapEndpoint + `/${sourceId}/by-cohort-definition-ids/${selectedStudyPopulationCohort.cohort_definition_id}/${selectedOutcomeCohort.cohort_definition_id}`;
    const response = await fetch(endpoint, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json(); // this response has the form: { cohort_overlap: { case_control_overlap: 648242 }}
    return responseData.cohort_overlap?.case_control_overlap;
  };

  const getInObservationWindow = async () => {
    if (! (selectedStudyPopulationCohort && datasetObservationWindow) ) {
      return null;
    }
    const endpoint = CohortsEndpoint + `/${sourceId}/by-cohort-definition-id/${selectedStudyPopulationCohort.cohort_definition_id}/by-observation-window/${datasetObservationWindow}`;
    const response = await fetch(endpoint, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.cohort_definition_and_stats?.size;
  };
  const getInObservationWindowAndOverlapWithOutcome = async () => {
    if (! (selectedStudyPopulationCohort && selectedOutcomeCohort && datasetObservationWindow) ) {
      return null;
    }
    const endpoint = CohortsEndpoint + `/${sourceId}/by-cohort-definition-ids/${selectedStudyPopulationCohort.cohort_definition_id}/${selectedOutcomeCohort.cohort_definition_id}/by-observation-window-1st-cohort/${datasetObservationWindow}`;
    const response = await fetch(endpoint, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.cohort_definition_and_stats?.size;
  };

  const getInObservationWindowAndOverlapWithOutcomeAndInOutcomeWindow = async () => {
    if (! (selectedStudyPopulationCohort && selectedOutcomeCohort && datasetObservationWindow && outcomeObservationWindow) ) {
      return null;
    }
    const endpoint = CohortsEndpoint + `/${sourceId}/by-cohort-definition-ids/${selectedStudyPopulationCohort.cohort_definition_id}/${selectedOutcomeCohort.cohort_definition_id}/by-observation-window-1st-cohort/${datasetObservationWindow}/by-outcome-window-2nd-cohort/${outcomeObservationWindow}`;
    const response = await fetch(endpoint, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.cohort_definition_and_stats?.size;
  };

  const [values, setValues] = useState<ValueMap>({
    A1: null, B1: null, C1: null,
    A2: null, B2: null, C2: null,
    A3: null, B3: null, C3: null,
  });

  const [errors, setErrors] = useState<ValueMap>({
    A1: null, B1: null, C1: null,
    A2: null, B2: null, C2: null,
    A3: null, B3: null, C3: null,
  });

  const [loading, setLoading] = useState<LoadingMap>({
    A1: false, B1: false, C1: false,
    A2: false, B2: false, C2: false,
    A3: false, B3: false, C3: false,
  });

  const valueFns: ((vals: ValueMap) => Promise<number | null>)[][] = [
    [
      async () => selectedStudyPopulationCohort?.size,                    // A1
      async () => getOverlapWithOutcome(),                                // B1
      async (v) => (v.A1 == null || v.B1 == null ? null : (v.A1 - v.B1)), // C1
    ],
    [
      async () => getInObservationWindow(),                               // A2
      async () => getInObservationWindowAndOverlapWithOutcome(),          // B2
      async (v) => (v.A2 == null || v.B2 == null ? null : (v.A2 - v.B2)), // C2
    ],
    [
      async (v) =>  (v.B3 == null || v.C3 == null ? null : (v.B3 + v.C3)),                         // A3
      async () => getInObservationWindowAndOverlapWithOutcomeAndInOutcomeWindow(),                 // B3
      async (v) =>  (v.C2 == null || v.B2 == null || v.B3 == null ? null : (v.C2 +(v.B2 - v.B3))), // C3
    ],
  ];

  useEffect(() => {
    const compute = async (initialValues: ValueMap, recalculateAll: boolean) => {
      let result: ValueMap = { ...initialValues };
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const key = cellKeys[row][col];
          const fn = valueFns[row][col];
          // only compute if (still) null:
          try {
            if (result[key] == null || recalculateAll) {
              setLoading((prev) => ({ ...prev, [key]: true }));
              result[key] = await fn(result);
              setLoading((prev) => ({ ...prev, [key]: false }));
            }
          } catch (e) {
            console.log(`Error while computing attrition table cell value: ${e}`);
            errors[key] = ComputeError;
            setLoading((prev) => ({ ...prev, [key]: false }));
          }
        }
      }
      return result;
    };

    (async () => {
        let firstPassValues = await compute(values, true); // First pass
        let secondPassValues = await compute(firstPassValues, false); // Second pass using updated values
        setValues(secondPassValues); // Update state with final result
    })();

  }, [
    selectedStudyPopulationCohort,
    datasetObservationWindow,
    selectedOutcomeCohort,
    outcomeObservationWindow,
  ]);

  const getValueForKey = (key: Key) => {
    if (loading[key]) {
      return <Loader size="xs" />;
    } else if (values[key] != null) {
      return values[key];
    } else if (errors[key] === ComputeError) {
      return '❌';
    } else {
      return "...";
    }
  };

  return (
    <Table striped withTableBorder withColumnBorders>
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Step</th>
          <th>Filter Applied</th>
          <th>Training set</th>
          <th>With outcome</th>
          <th>Without outcome</th>
        </tr>
      </thead>
      <tbody>
        {cellKeys.map((row, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{descriptions[i]}</td>
            {row.map((key) => (
              <td key={key}>{getValueForKey(key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
