import api from '../api'
import {
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT,
    AUTH_LOADING
} from './types'

export const register = (formData,history,setRedirect) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        api.post('/api/auth/register',formData)
        .then(response=>{
          
            dispatch({type:AUTH_SUCCESS,payload:{user:response.data.user, token:response.data.token ,loading:false}})
            history.push('/home')
        })
        .catch(err=>{
            dispatch({type:AUTH_FAILED,payload:{errors:err.response?.data ,loading:false}})
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = (formData,history,setRedirect) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        api.post('/api/auth/login',formData)
        .then(response=>{
            dispatch({type:AUTH_SUCCESS,payload:{user:response.data?.user, token:response.data?.token ,loading:false}})
            history.push('/home')
        })
        .catch(err=>{
            dispatch({type:AUTH_FAILED,payload:{errors:err.response?.data ,loading:false}})
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = (history) => dispatch => {
    dispatch({type:LOGOUT,payload:{}})
    history.push('/')
}
