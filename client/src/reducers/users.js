import { CANCLE, GET_ALL_USERS, SEARCH_USER,REQUEST } from '../actions/types'

export default (state = [], { type, payload }) => {
    switch (type) {

    case GET_ALL_USERS:
        return payload
    case SEARCH_USER:
        return payload
    case CANCLE:
        //somelogic
        return state
    case REQUEST:
        console.log(state)
        return state
    default:
        return state
    }
}

