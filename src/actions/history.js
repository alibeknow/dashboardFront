import axios from 'axios'
import { FETCH_HISTORY_ERROR, FETCH_HISTORY_START, FETCH_HISTORY_SUCCESS } from './actionTypes';
export function fetchHistory(){
  return async dispatch=>{
    dispatch(fetchHistoryStart)  
    try {
      const response=await axios.get('http://localhost:3444/monster');
      dispatch(fetchHistorySuccess(response.data))      
    } catch (error) {
      dispatch(fetchHistoryError(error))
    }
  }
}

export function fetchHistoryStart(){
  return {
    type:FETCH_HISTORY_START
  }
    
}
export function fetchHistorySuccess(rows){
  return {
    type:FETCH_HISTORY_SUCCESS,
    rows
  } 
}
export function fetchHistoryError(){
  return {
    type:FETCH_HISTORY_ERROR
  } 
}