import AUTH_ACTIONS from "./AuthActions";
import {getUserFromLocalStorage, setUserToLocalStorage} from "../services/AuthService";

const authReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            setUserToLocalStorage(payload.data)
            return {
                ...state,
                user: {
                    memberId: payload.data,
                },
                isLoading: false,
                message: payload.message
            }
        case AUTH_ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case AUTH_ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case AUTH_ACTIONS.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                message: payload
            }
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isLoading: false
            }
        case AUTH_ACTIONS.FETCH_USER_COMPLETE:
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
        case AUTH_ACTIONS.FETCH_USER_FAILED:
            return {
                ...state,
                message: payload,
                isLoading: false
            }
        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case AUTH_ACTIONS.NEXT_PAGE:
            return {
                ...state,
                isLoading: false,
                page: payload,
            }
        case AUTH_ACTIONS.FETCH_LIST_PARTNER_COMPLETE:
            return {
                ...state,
                isLoading: false,
                partners: [...payload]
            }
        case AUTH_ACTIONS.FETCH_LIST_PARTNER_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return {...state};
    }
}

export default authReducer;