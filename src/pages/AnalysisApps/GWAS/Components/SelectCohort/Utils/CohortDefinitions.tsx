import React, { useState } from 'react';
// import { useQuery } from 'react-query';
// import { Table, Spin, Radio } from 'antd';
import { IconDatabaseOff } from '@tabler/icons-react';
import { Loader, Table, Pagination, Select } from '@mantine/core';
// import { fetchCohortDefinitions } from '../../../Utils/cohortMiddlewareApi';
// import queryConfig from '../../../../SharedUtils/QueryConfig';
import { useFilter } from '../../../Utils/formHooks';
import { CohortsEndpoint } from '@/pages/AnalysisApps/SharedUtils/Endpoints';
import useSWR from 'swr';

interface CohortDefinitionsProps {
  selectedCohort?: number | undefined;
  handleCohortSelect: (arg0: number) => void;
  searchTerm: string;
  selectedTeamProject: string;
}
interface cohort {
  cohort_definition_id: number;
  cohort_name: string;
  size: number;
}

// Define the component using the interface
const CohortDefinitions: React.FC<CohortDefinitionsProps> = ({
  selectedCohort = undefined,
  handleCohortSelect,
  searchTerm,
  selectedTeamProject,
}) => {
  // State to manage selected row (only one row at a time)
  // const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows to show per page

  // SWR CODE
  const { data, error, isLoading } = useSWR(CohortsEndpoint, (...args) =>
    fetch(...args).then((res) => res.json()),
  );
  let displayedCohorts: cohort[] = useFilter(data, searchTerm, 'cohort_name');

  /*
  const handleSelectCohort = (cohortId) => {
    setSelectedCohort(cohortId);
  };
 */
  /*
  const cohortSelection = (inputSelectedCohort) => ({
    type: 'radio',
    columnTitle: 'Select',
    selectedRowKeys: inputSelectedCohort
      ? [inputSelectedCohort.cohort_definition_id]
      : [],
    onChange: (_, selectedRows) => {
      handleCohortSelect(selectedRows[0]);
    },
    renderCell: (checked, record) => null,

    */
  /*      <Radio
        checked={checked}
        value={record.cohort_definition_id}
        aria-label={'Row action: study population selection'}
      />
  });*/
  /*
  const cohortTableConfig = [
    {
      title: 'Cohort Name',
      dataIndex: 'cohort_name',
      key: 'cohort_name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
  ];
  */
  if (error)
    return <React.Fragment>Error getting data for table</React.Fragment>;

  if (isLoading)
    return (
      <React.Fragment>
        <div className="GWASUI-spinnerContainer GWASUI-emptyTable flex justify-center pt-8 min-h-[300px]">
          <Loader size="lg" variant="dots" />
        </div>
      </React.Fragment>
    );

  if (data) {
    displayedCohorts = displayedCohorts.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage,
    );
    return (
      <React.Fragment>
        <div className="w-full min-h-[200px] py-5">
          {displayedCohorts?.length > 0 ? (
            <Table className="shadow">
              <Table.Thead className="bg-vadc-slate_blue font-light">
                <Table.Tr>
                  <Table.Th>Select</Table.Th>
                  <Table.Th>Cohort Name</Table.Th>
                  <Table.Th>Size</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {displayedCohorts.map((cohort, i) => (
                  <Table.Tr
                    key={i}
                    className={i % 2 ? 'bg-vadc-alternate_row' : ''}
                  >
                    <Table.Td>
                      <input
                        type="radio"
                        id={`radio-buttion-${i}`}
                        checked={selectedCohort === cohort.cohort_definition_id}
                        onChange={() => {
                          handleCohortSelect(cohort.cohort_definition_id);
                        }}
                      />
                      <label htmlFor={`radio-buttion-${i}`} className="sr-only">
                        Select this row
                      </label>
                    </Table.Td>
                    <Table.Td>{cohort.cohort_name}</Table.Td>
                    <Table.Td>{cohort.size}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div>
                <IconDatabaseOff />
              </div>
              <div>No Data</div>
            </div>
          )}
          <div
            data-testid="pagination-controls"
            className="flex justify-between w-full"
          >
            <Pagination
              className="pt-5 flex justify-end"
              value={page}
              onChange={setPage}
              total={Math.ceil(data.length / rowsPerPage)} // Calculate total pages
              color="blue"
              size="md"
              withEdges
            />
            <Select
              className="pt-5 pl-3 w-32"
              value={rowsPerPage.toString()}
              onChange={(value) => setRowsPerPage(Number(value))}
              size="sm"
              data={[
                { value: '10', label: '10 /page' },
                { value: '20', label: '20 /page' },
                { value: '50', label: '50 /page' },
                { value: '100', label: '100 /page' },
              ]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default CohortDefinitions;
