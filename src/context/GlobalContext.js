import {createContext, useReducer} from "react";
import globalReducer from "./GlobalReducer";
import {authLogin, authRegister, getProfile, getUserFromLocalStorage, userActivation} from "../components/auth/services/AuthService";
import {errorAlert, successAlert} from "../shared/notification/SweetAlert";
import ACTIONS from "./Actions";
import {listChoosenPartner} from "../components/partner/services/PartnerService";

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

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    const register = (data, setValue) => {
        dispatch({type: ACTIONS.SET_LOADING});

        authRegister(data)
            .then(res => {
                userActivation(res.data.memberId)
                    .then(r => {
                        dispatch({
                            type: ACTIONS.REGISTER_SUCCESS,
                            payload: r.message
                        });
                        successAlert("Registration success", "Member activation success")
                            .then(() => setValue('2'))
                    })
                    .catch(err => {
                        dispatch({
                            type: ACTIONS.REGISTER_FAILED,
                            payload: err.response.data.ErrorDescription.message
                        });
                        errorAlert(err);
                    })
            })
            .catch(err => {
                dispatch({type: ACTIONS.REGISTER_FAILED})
                if (err.response.status === 500) {
                    errorAlert('Server dalam kendala, silakan hubungi admin');
                } else {
                    errorAlert(err.response.data.ErrorDescription.message);
                }
            })
    }

    const login = ({userName, password}, navigate) => {
        dispatch({type: ACTIONS.SET_LOADING})

        authLogin({
            userName,
            password
        })
            .then(r => {
                successAlert(r.message).then(() => {
                    dispatch({
                        type: ACTIONS.LOGIN_SUCCESS,
                        payload: r
                    });
                    navigate('/find')
                });
            })
            .catch((err) => {
                errorAlert(err);
                dispatch({
                    type: ACTIONS.LOGIN_FAILED,
                    payload: err.response.data.ErrorDescription.message
                });
            })
    }

    const fetchUser = (id) => {
        dispatch({type: ACTIONS.SET_LOADING});
        getProfile(id)
            .then(r => {
                const data = {
                    memberId: id,
                    data: r
                };
                dispatch({
                    type: ACTIONS.FETCH_USER_COMPLETE,
                    payload: data
                });
            })
            .catch(err => {
                dispatch({
                    type: ACTIONS.FETCH_USER_FAILED,
                    payload: err.response.data.ErrorDescription.message
                });
            })
    }

    const logout = () => {
        dispatch({type: ACTIONS.SET_LOADING});
        if (getUserFromLocalStorage() === null) return;
        localStorage.removeItem("user");
        dispatch({
            type: ACTIONS.LOGOUT
        });
    }

    const fetchListPartner = (id) => {
        dispatch({type: ACTIONS.SET_LOADING});
        listChoosenPartner(id)
            .then((r) => {
                dispatch({
                    type: ACTIONS.FETCH_LIST_PARTNER_COMPLETE,
                    payload: r.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ACTIONS.FETCH_LIST_PARTNER_FAILED
                });
                errorAlert(err.response.data.ErrorDescription.message);
            })
    }

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                message: state.message,
                partners: state.partners,
                register,
                login,
                fetchUser,
                logout,
                fetchListPartner
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

