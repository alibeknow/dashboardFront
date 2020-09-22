
import  React from 'react';
import { DataGrid, ToolbarOptions } from 'tubular-react';
import columns from './columns';
import { useGridRefresh } from 'tubular-react-common';
import { LocalStorage } from 'tubular-common';
import Button from '@material-ui/core/Button';
import { FETCH_HISTORY_ERROR, FETCH_HISTORY_START, FETCH_HISTORY_SUCCESS } from 'actions/actionTypes';
import {fetchHistory} from '../../actions/history'

const RemoteDataGrid = () => {
  const [refresh, forceRefresh] = useGridRefresh();
  const forceGridRefresh = () => forceRefresh();

  const rowClick = (row) => console.log('You clicked on a row: ', row);

  const toolbarButton = new ToolbarOptions({
    customItems: <Button onClick={forceGridRefresh}>Force refresh</Button>
  });

  return (
    <DataGrid
      columns={[...columns]}
      dataSource="https://tubular.azurewebsites.net/api/orders/paged"
      deps={[refresh]}
      gridName="Tubular-React"
      onRowClick={rowClick}
      storage={new LocalStorage()}
      toolbarOptions={toolbarButton}
    />
  );
};

export default RemoteDataGrid;
