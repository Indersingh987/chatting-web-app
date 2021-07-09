import { combineReducers } from 'redux'
import auth from './auth.js'
import users from './users'
import requestList from './requestList'
import friendList from './friendList'
import room from './room'

export default combineReducers({
    auth,
    users,
    requestList,
    friendList,
    room
})