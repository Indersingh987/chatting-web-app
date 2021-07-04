import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from '../actions/types'

const reducer = ( state={}, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            sessionStorage.setItem('user',JSON.stringify(action.payload.user))
            sessionStorage.setItem('token',JSON.stringify(action.payload.token))
            return action.payload
        case AUTH_FAILED:
            return action.payload
        case AUTH_LOADING:
            return action.payload
        case LOGOUT:
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
            sessionStorage.clear()
            return null
        default:
            return state
    }
}

export default reducer