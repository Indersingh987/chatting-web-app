const reducer = ( state={}, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            console.log(action.payload.token)
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            localStorage.setItem('token',JSON.stringify(action.payload.token))
            return action.payload
        case 'AUTH_FAILED':
            return action.payload
        default:
            return state
    }
}

export default reducer