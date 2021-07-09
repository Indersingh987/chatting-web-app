import {REQUEST_LIST_LOADING,REQUEST_LIST, ACCEPT, ACCEPT_LOADING} from '../actions/types'


const reducer = (state = {list:[],loading:false}, action) => {
    switch (action.type) {

    case REQUEST_LIST_LOADING:
        return {...state,loading:true}
    case REQUEST_LIST:
        return {list:action.payload,loading:false}
    case ACCEPT_LOADING:
        let a = [...state.list]
        a[action.payload] = { ...a[action.payload],btn:false }
        return {...state,list:a}
    case ACCEPT:
        let b = []
        for(let i=0;i < state.list.length; i++){
            if(i !== action.payload){
                b.push(state.list[i])
            }
        }
        return {...state,list:b}
    default:
        return state
    }
}

export default reducer
