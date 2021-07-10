import api from '../api'
import { GET_ALL_USERS, SEARCH_USER,CANCLE,CANCLE_LOADING,REQUEST,REQUEST_LOADING,GET_ALL_USERS_LOADING,SEARCH_USER_LOADING } from './types'

export const getAllUsers = () => (dispatch) =>{
    dispatch({type:GET_ALL_USERS_LOADING,payload:[]})
    api.get('/api/users',{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:GET_ALL_USERS,payload:res.data})
    })
    .catch(err=>{
        console.log('in user action err function',err)
    })
}

export const search = (searchQuery) => dispatch => {
    dispatch({type:SEARCH_USER_LOADING,payload:[]})
    api.post('/api/users/search',{ searchQuery },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:SEARCH_USER,payload:res.data})
    })
    .catch(err=>console.log('err in fetching search query ',err))
}

export const cancle = (id,index) => dispatch => {
    dispatch({type:CANCLE_LOADING,payload:index})
    api.post('/api/request/cancle',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>{
        dispatch({type:CANCLE,payload:index})
    })
    .catch(err=>console.log('err in sending request ',err))
}

export const request = (id,index) => dispatch => {
    dispatch({type:REQUEST_LOADING,payload:index})
    api.post('/api/request/send',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,'Content-Type':'application/x-www-form-urlencoded'}})
    .then(res=>{
        dispatch({type:REQUEST,payload:index})
    })
    .catch(err=>console.log('err in sending reqquest ',err))
}