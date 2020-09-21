import React from 'react';

import {connect} from 'react-redux'
import {fetchHistory,changePageSize} from '../../actions/history'
import {
  PagingState,
  SortingState,
  FilteringState,
  IntegratedFiltering,
  SearchState,
  CustomPaging,

} from '@devexpress/dx-react-grid';

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
  TableFilterRow,
  PagingPanel
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
              { name: 'address', title: 'Номер абонента' },
              { name: 'routeType', title: 'Тип маршрута' },
              { name: 'message', title: 'Сообщение' },
              { name: 'status', title: 'Статус' },
              { name: 'channel', title: 'Канал' },
              { name: 'created', title: 'Дата создания' },
              { name: 'sended', title: 'Дата отправки' },
              { name: 'delivered', title: 'Дата доставки' }
            ]}
            rows={this.props.rows}
          >
            <FilteringState
              filters={this.props.filters}
              onFiltersChange={this.props.fetchHistory}
            />
            <SortingState
              defaultSorting={[
                { columnName: 'address', direction: 'asc' },
                { columnName: 'message', direction: 'asc' },
              ]}
            />

            <SearchState />
            <IntegratedFiltering />
            <PagingState
              currentPage={this.props.currentPage}
              onCurrentPageChange={this.props.currentPage}
              onPageSizeChange={this.props.changePageSize}
              pageSize={this.props.pageSize}
            />
            <CustomPaging
              totalCount={this.props.totalCount}
            />
            <Table />
            <TableHeaderRow showSortingControls />
            <TableFilterRow showFilterSelector />
            <TableColumnReordering
              defaultOrder={['address', 'routeType', 'message', 'status']}
            />

            <PagingPanel
              pageSizes={this.props.pageSizes}
            />
          </Grid>
          
        </Paper>
      </Page>
    );
  }


}

function mapStateToProps(state) {

  return {
    rows: state.history.rows,
    filters:state.history.filters,
    totalCount:state.history.totalCount, 
    pageSize:state.history.pageSize,
    pageSizes: state.history.pageSizes,
    currentPage:state.history.currentPage,
    lastQuery:state.history.lastQuery,
    loading: state.history.loading
    
  }
}

function mapDispatchToProps(dispatch,ownProps) {
  return {
    fetchHistory: () => dispatch(fetchHistory(ownProps)),
    changePageSize: () => dispatch(changePageSize({pageSize:this.props.pageSize,currentPage:this.props.currentPage}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HistoryTable);
