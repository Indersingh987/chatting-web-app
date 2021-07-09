import { FRIEND_LIST, FRIEND_LIST_LOADING } from "../actions/types"


const reducer =  (state = {list:[],loading:true}, action) => {
    switch (action.type) {

    case FRIEND_LIST_LOADING:
        return { ...state,loading:true}
    case FRIEND_LIST:
        return {...state,list:action.payload,loading:false}
    default:
        return state
    }
}

export default reducer