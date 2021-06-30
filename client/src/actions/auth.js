import api from '../api'

export const register = (formData,history) => async (dispatch) =>{
    try {
        api.post('/api/users/register',formData)
        .then(response=>{
            dispatch({type:'AUTH_SUCCESS',payload:response.data})
            history.push('/home')
        })
        .catch(err=>{
            dispatch({type:'AUTH_FAILED',payload:err.response?.data})
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = (formData,history) => async (dispatch) =>{
    try {
        // const { data } = await api.post('/api/users/login',formData)

        api.post('/api/users/login',formData)
        .then(response=>{
            dispatch({type:'AUTH_SUCCESS',payload:response.data})
            history.push('/home')
        })
        .catch(err=>{
            dispatch({type:'AUTH_FAILED',payload:err.response.data})
        })
        
    } catch (error) {
        console.log(error)
    }
}