import React, { useState, useCallback } from 'react';
import { DataSheetGrid, textColumn } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';
import Select from 'react-select';
import axios from 'axios';

// Custom select column
const selectColumn = (fetchData) => ({
  component: ({ rowData, setRowData }) => {
    const [options, setOptions] = useState([]);

    const loadOptions = async (inputValue) => {
      try {
        const response = await fetchData(inputValue);
        setOptions(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return (
      <Select
        value={rowData ? { label: rowData, value: rowData } : null}
        onChange={(selected) => setRowData(selected.value)}
        onInputChange={loadOptions}
        options={options}
      />
    );
  },
  deleteValue: () => null,
});

const fetchData = async (inputValue) => {
  const response = await axios.get(`/api/data?query=${inputValue}`);
  return response.data.map(item => ({ label: item.name, value: item.id }));
};

const Test = () => {
  const [data, setData] = useState([{ select: '', text: '' }]);

  const columns = [
    { ...selectColumn(fetchData), title: 'Select', width: 200 },
    { ...textColumn, title: 'Text', width: 200 },
  ];

  return (
    <DataSheetGrid
      data={data}
      onChange={setData}
      columns={columns}
      autoAddRow
    />
  );
};

export default Test;
