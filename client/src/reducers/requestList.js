import {REQUEST_LIST_LOADING,REQUEST_LIST, ACCEPT, ACCEPT_LOADING,REJECT_LOADING, REJECT} from '../actions/types'


const reducer = (state = {list:[],loading:false}, action) => {
    switch (action.type) {

    case REQUEST_LIST_LOADING:
        return {...state,loading:true}
    case REQUEST_LIST:
        return {list:action.payload,loading:false}
    case ACCEPT_LOADING:
        let x = [...state.list]
        x[action.payload] = { ...x[action.payload],btn:false }
        return {...state,list:x}
    case REJECT_LOADING:
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
    case REJECT:
        let y = []
        for(let i=0;i < state.list.length; i++){
            if(i !== action.payload){
                y.push(state.list[i])
            }
        }
        return {...state,list:y}
    default:
        return state
    }
}

export default reducer
