import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {connect} from 'react-redux'
import {fetchHistory} from '../../actions/history'

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
  VirtualTable,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';



class HistoryTable extends React.Component
{

  componentDidMount(){
    this.props.fetchHistory()
  }
  render()
  {
    return (
      <Page
        
        title="Default Dashboard"
      >
        <Header />
        <Paper>
          <Grid
            columns={[
              { name: 'name', title: 'Name' },
              { name: 'gender', title: 'Gender' },
              { name: 'city', title: 'City' },
              { name: 'car', title: 'Car' },
            ]}
            rows={this.props.rows}
          >
            <DragDropProvider />
            <Table />
            <TableColumnReordering
              defaultOrder={['city', 'gender', 'car', 'name']}
            />
    
            <VirtualTable />
            <TableHeaderRow />
            <TableFilterRow />
          </Grid>
        </Paper>
      </Page>
    );
  }


}

function mapStateToProps(state) {
  return {
    rows: state.history.rows,
    loading: state.history.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHistory: () => dispatch(fetchHistory())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HistoryTable);
