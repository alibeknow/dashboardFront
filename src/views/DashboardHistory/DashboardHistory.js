import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { FilteringState } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';


const URL = 'http://localhost:3444/monster';

export default () => {
  const [columns] = useState([
    { name: 'id', title: 'Country' },
    { name: 'name', title: 'City' },
    { name: 'gender', title: 'Address' },
  ]);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();

  const getQueryString = () => {
    let filter = filters.reduce((acc, { columnName, value }) => {
      acc.push(`["${columnName}", "contains", "${encodeURIComponent(value)}"]`);
      return acc;
    }, []).join(',"and",');

    if (filters.length > 1) {
      filter = `[${filter}]`;
    }

    return `${URL}?filter=${filter}`;
  };

  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then((orders) => {
          setRows(orders);
          setLoading(false);
          setLastQuery(queryString);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid
        columns={columns}
        rows={rows}
      >
        <FilteringState
          onFiltersChange={setFilters}
        />
        <VirtualTable />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>

    </Paper>
  );
};
