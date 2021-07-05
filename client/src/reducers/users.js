import { CANCLE, GET_ALL_USERS, SEARCH_USER,REQUEST, GET_ALL_USERS_LOADING, SEARCH_USER_LOADING,CANCLE_LOADING,REQUEST_LOADING } from '../actions/types'

const reducer = (state = {users:[],loading:true}, action) => {
    switch (action.type) {

    case GET_ALL_USERS_LOADING:
        return {...state,loading:true}

    case GET_ALL_USERS:
        return {...state,users:action.payload,loading:false}

    case SEARCH_USER_LOADING:
        return {...state,loading:true}

    case SEARCH_USER:
        return {...state,users:action.payload,loading:false}

    case CANCLE_LOADING:
        let arr1 = [...state.users]
        arr1[action.payload] = {...arr1[action.payload],btn:false}
        return {...state,users:arr1}

    case CANCLE:
        let arr = [...state.users]
        arr[action.payload] = {...arr[action.payload],isSend:false,btn:true}
        return {...state,users:arr}

    case REQUEST_LOADING:
        let a1 = [...state.users]
        a1[action.payload] = {...a1[action.payload],btn:false}
        return {...state,users:a1}

    case REQUEST:
        let a = [...state.users]
        a[action.payload] = {...a[action.payload],isSend:true,btn:true}
        return {...state,users:a}

    default:
        return state
    }
}

export default reducer
