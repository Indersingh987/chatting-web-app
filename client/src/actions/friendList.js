import axios from 'axios'
import {FRIEND_LIST_LOADING,FRIEND_LIST} from './types'

export const getFriendList = () => dispatch => {
    dispatch({type:FRIEND_LIST_LOADING})
    axios.get('/api/friend',{headers:{'Authorization':`Bearer ${JSON.parse(sessionStorage.getItem('token'))}`}})
    .then(res=>dispatch({type:FRIEND_LIST,payload:res.data}))
    .catch(err=>console.log('err in fething friend list',err))
}

export const friend = (id,history) => {
    history.push(`/room/${id}`)
}