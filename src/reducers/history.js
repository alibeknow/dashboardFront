import { FETCH_HISTORY_ERROR, FETCH_HISTORY_START, FETCH_HISTORY_SUCCESS } from 'actions/actionTypes'

const initialState={
  rows:[],
  loading:false,
  columns:[
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ],
  filter:null
}


export default function historyReducer(state=initialState,action){
  switch (action.type) {

    case FETCH_HISTORY_START:
      return {...state,loading:true}
    case FETCH_HISTORY_SUCCESS:
      return {...state,loading:false,rows:action.rows}
    case FETCH_HISTORY_ERROR:
      return {...state,loading:false,error:action.error}
    default:
      return state
            
  }
}