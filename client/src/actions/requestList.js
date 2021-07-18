import axios from 'axios'
import { REQUEST_LIST, REQUEST_LIST_LOADING,ACCEPT,ACCEPT_LOADING,REJECT_LOADING,REJECT } from './types'

const getRequestList = () => dispatch =>{
    dispatch({type:REQUEST_LIST_LOADING})
    axios.get('/api/request',{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:REQUEST_LIST,payload:res.data})
    })
    .catch(err=>{
        console.log('err in getRequestList',err)
    })
}

const acceptRequest = (id,index) => dispatch => {
    dispatch({type:ACCEPT_LOADING,payload:index})
    axios.post('/api/request/accept',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:ACCEPT,payload:index})
    })
    .catch(err=>{
        console.log('err in getRequestList',err)
    })
}

const rejectRequest = (id,index) => dispatch => {
    dispatch({type:REJECT_LOADING,payload:index})
    axios.post('/api/request/reject',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:REJECT,payload:index})
    })
    .catch(err=>{
        console.log('err in getRequestList',err)
    })
}

export { getRequestList,acceptRequest,rejectRequest }