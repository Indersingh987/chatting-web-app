import { ROOM_LOADING,ROOM,CREATE_MESSAGE } from '../actions/types'

const reducer = (state = {list:[],friend:null,loading:true} ,{ type, payload }) => {
    switch (type) {

    case ROOM_LOADING:
        return {...state,list:[],friend:null,loading:true}
    case ROOM:
        return {...state,list:payload.list,friend:payload.friend,loading:false}
    case CREATE_MESSAGE:
        return {...state}
    default:
        return state
    }
}

export default reducer