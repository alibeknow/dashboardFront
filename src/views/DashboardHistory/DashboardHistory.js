import React from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header
} from './components';

import Paper from '@material-ui/core/Paper';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardHistory = () => {
  const classes = useStyles();
  const columns = [
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ];
  const rows = [
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ];
  const tableColumnExtensions = [
    { columnName: 'gender', width: 100 },
  ];

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <DragDropProvider />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableColumnReordering
            defaultOrder={['city', 'gender', 'car', 'name']}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    </Page>
  );
};

export default DashboardHistory;
