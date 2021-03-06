import ACTIONS from "./Actions";
import {getUserFromLocalStorage, setUserToLocalStorage} from "../components/auth/services/AuthService";

const globalReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case ACTIONS.LOGIN_SUCCESS:
            setUserToLocalStorage(payload.data)
            return {
                ...state,
                user: {
                    memberId: payload.data,
                },
                isLoading: false,
                message: payload.message
            }
        case ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case ACTIONS.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isLoading: false
            }
        case ACTIONS.FETCH_USER_COMPLETE:
            return {
                ...state,
                user: {
                    ...state.user,
                    memberId: payload.memberId,
                    userData: payload.data.data
                },
                message: payload.data.message,
                isLoading: false
            }
        case ACTIONS.FETCH_USER_FAILED:
            return {
                ...state,
                message: payload,
                isLoading: false
            }
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ACTIONS.NEXT_PAGE:
            return {
                ...state,
                isLoading: false,
                page: payload,
            }
        case ACTIONS.FETCH_LIST_PARTNER_COMPLETE:
            return {
                ...state,
                isLoading: false,
                partners: payload
            }
        case ACTIONS.FETCH_LIST_PARTNER_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return {...state};
    }
}

export default globalReducer;