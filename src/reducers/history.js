import { FETCH_HISTORY_ERROR, FETCH_HISTORY_START, FETCH_HISTORY_SUCCESS } from 'actions/actionTypes'

const initialState={
  rows:[],
  loading:false,
  columns:[
    { name: 'address', title: 'Номер абонента' },
    { name: 'routeType', title: 'Тип маршрута' },
    { name: 'message', title: 'Сообщение' },
    { name: 'status', title: 'Статус' },
    { name: 'channel', title: 'Канал' },
    { name: 'created', title: 'Дата создания' },
    { name: 'sended', title: 'Дата отправки' },
    { name: 'delivered', title: 'Дата доставки' }
  ],
  filters:[],
  totalCount:0, 
  pageSize:10,
  pageSizes:[5,10,15,20],
  currentPage:0,
  lastQuery:null
}


export default function historyReducer(state=initialState,action){
  switch (action.type) {

    case FETCH_HISTORY_START:
      
      return {...state,loading:true}
    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        loading:false,
        rows:action.rows,
        totalCount:action.totalCount,
        pageSize:action.pageSize,
        currentPage:action.currentPage,
        lastQuery:action.lastQuery,
        filters:action.filters || []
      }
    case FETCH_HISTORY_ERROR:
      return {...state,loading:false,error:action.error}
    default:
      return state
            
  }
}