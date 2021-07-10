import api from '../api'
import {ROOM,ROOM_LOADING,CREATE_MESSAGE} from './types'

export const getList = (id) => dispatch => {
    dispatch({type:ROOM_LOADING})
    api.post('/api/message',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>dispatch({type:ROOM,payload:{list:res.data.list,friend:res.data.friend}}))
    .catch(err=>console.log('err in fething friend list',err))
}

export const create = (id,text,time) => dispatch => {
    api.post('/api/message/new',{ id,text,time },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>dispatch({type:CREATE_MESSAGE,payload:res.data}))
    .catch(err=>console.log('err in fething friend list',err))
}
