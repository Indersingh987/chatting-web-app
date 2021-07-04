import { combineReducers } from 'redux'
import auth from './auth.js'
import users from './users'

export default combineReducers({
    auth,
    users
})