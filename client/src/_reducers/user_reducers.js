// 전 state와 현재 state 받음
import {
    LOGIN_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // ...은 parameter state 그대로 가져오는거 
            return { ...state, loginSuccess: action.payload }
            break;
        default:
            return state;
    }
}