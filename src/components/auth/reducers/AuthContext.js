import {createContext, useReducer} from "react";
import authReducer from "./AuthReducer";
import {authLogin, authRegister, getProfile, getUserFromLocalStorage, userActivation} from "../services/AuthService";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import AUTH_ACTIONS from "./AuthActions";
import {listChoosenPartner} from "../../partner/services/PartnerService";

const initialState = {
    user: {
        memberId: '',
        userData: {}
    },
    partners: [],
    page: 0,
    isLoading: false,
    message: ''
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = (data, setValue) => {
        dispatch({type: AUTH_ACTIONS.SET_LOADING});

        authRegister(data)
            .then(res => {
                userActivation(res.data.memberId)
                    .then(r => {
                        dispatch({
                            type: AUTH_ACTIONS.REGISTER_SUCCESS,
                            payload: r.message
                        });
                        successAlert("Registration success", "Member activation success")
                            .then(() => setValue('2'))
                    })
                    .catch(err => {
                        dispatch({
                            type: AUTH_ACTIONS.REGISTER_FAILED,
                            payload: err.response.data.ErrorDescription.message
                        });
                        errorAlert(err);
                    })
            })
            .catch(err => {
                dispatch({type: AUTH_ACTIONS.REGISTER_FAILED})
                if (err.response.status === 500) {
                    errorAlert('Server dalam kendala, silakan hubungi admin');
                } else {
                    errorAlert(err.response.data.ErrorDescription.message);
                }
            })
    }

    const login = ({userName, password}, navigate) => {
        dispatch({type: AUTH_ACTIONS.SET_LOADING})

        authLogin({
            userName,
            password
        })
            .then(r => {
                successAlert(r.message).then(() => {
                    dispatch({
                        type: AUTH_ACTIONS.LOGIN_SUCCESS,
                        payload: r
                    });
                    navigate('/find')
                });
            })
            .catch((err) => {
                errorAlert(err);
                dispatch({
                    type: AUTH_ACTIONS.LOGIN_FAILED,
                    payload: err.response.data.ErrorDescription.message
                });
            })
    }

    const fetchUser = (id) => {
        dispatch({type: AUTH_ACTIONS.SET_LOADING});

        getProfile(id)
            .then(r => {
                const data = {
                    memberId: id,
                    data: r
                };
                dispatch({
                    type: AUTH_ACTIONS.FETCH_USER_COMPLETE,
                    payload: data
                });
            })
            .catch(err => {
                errorAlert(err);
                dispatch({
                    type: AUTH_ACTIONS.FETCH_USER_FAILED,
                    payload: err.response.data.ErrorDescription.message
                });
            })
    }

    const logout = () => {
        dispatch({type: AUTH_ACTIONS.SET_LOADING});
        if (getUserFromLocalStorage() === null) return;
        localStorage.removeItem("user");
        dispatch({
            type: AUTH_ACTIONS.LOGOUT
        });
    }

    const fetchListPartner = () => {
        dispatch({type: AUTH_ACTIONS.SET_LOADING});
        if (getUserFromLocalStorage() === null) return;
        listChoosenPartner(getUserFromLocalStorage().memberId)
            .then()
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                message: state.message,
                register,
                login,
                fetchUser,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}

