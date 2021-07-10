import api from '../api'
import { REQUEST_LIST, REQUEST_LIST_LOADING,ACCEPT,ACCEPT_LOADING } from './types'

const getRequestList = () => dispatch =>{
    dispatch({type:REQUEST_LIST_LOADING})
    api.get('/api/request',{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>{
        dispatch({type:REQUEST_LIST,payload:res.data})
    })
    .catch(err=>{
        console.log('err in getRequestList',err)
    })
}

const acceptRequest = (id,index) => dispatch => {
    dispatch({type:ACCEPT_LOADING,payload:index})
    api.post('/api/request/accept',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>{
        console.log(res.data)
        dispatch({type:ACCEPT,payload:index})
    })
    .catch(err=>{
        console.log('err in getRequestList',err)
    })
}

export { getRequestList,acceptRequest }