import api from '../api'
import { GET_ALL_USERS, SEARCH_USER,CANCLE,REQUEST } from './types'

export const getAllUsers = () => (dispatch) =>{
    api.get('/api/users',{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:GET_ALL_USERS,payload:res.data})
    })
    .catch(err=>{
        console.log('in user action err function',err)
    })
}

export const search = (searchQuery) => dispatch => {
    api.post('/api/users/search',{ searchQuery },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:SEARCH_USER,payload:res.data})
    })
    .catch(err=>console.log('err in fetching search query ',err))
}

export const cancle = (id) => dispatch => {
    api.post('/api/request/cancle',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        console.log(res.data)
        dispatch({type:CANCLE,payload:res.data})
    })
    .catch(err=>console.log('err in sending request ',err))
}

export const request = (id) => dispatch => {
    api.post('/api/request/send',{ id },{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>{
        dispatch({type:REQUEST,payload:res.data})
    })
    .catch(err=>console.log('err in sending reqquest ',err))
}