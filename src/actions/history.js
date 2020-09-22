import axios from 'axios'
import { FETCH_HISTORY_ERROR, FETCH_HISTORY_START, FETCH_HISTORY_SUCCESS } from './actionTypes';
export function fetchHistory(filters){
  console.log(filters)
  return async dispatch=>{
    dispatch(fetchHistoryStart)  
    try {
      const response=await axios.get('http://10.20.35.85:3000/history',
        {
          data:filters
        });
      const [items,totalCount]=response.data
      dispatch(fetchHistorySuccess(items,totalCount))      
    } catch (error) {
      dispatch(fetchHistoryError(error))
    }
  }
}
export function changePageSize  (params)  {
  const {totalCount,currentPage,pageSize}=params
  const totalPages = Math.ceil(totalCount / pageSize);
  const updatedCurrentPage = Math.min(currentPage, totalPages - 1);
  return {
    pageSize,
    currentPage:updatedCurrentPage
  }
}
export function fetchHistoryStart(){
  return {
    type:FETCH_HISTORY_START
  }
    
}
export function fetchHistorySuccess(rows,totalCount){
  changePageSize({totalCount,pageSize:10,currentPage:0})
  return {
    type:FETCH_HISTORY_SUCCESS,
    rows,
    totalCount

  } 
}
export function fetchHistoryError(){
  return {
    type:FETCH_HISTORY_ERROR
  } 
}