import React, {useContext} from 'react';
import Home from '../components/layout/Home';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import UpdateProfileForm from "../components/auth/components/UpdateProfileForm";
import {getUserFromLocalStorage} from "../components/auth/services/AuthService";
import PreferenceForm from "../components/auth/components/PreferenceForm";
import FindPartner from "../components/partner/components/FindPartner";
import RESPONSE_MESSAGE from "../constant/response-message";
import ListPartner from "../components/partner/components/ListPartner";
import {AuthContext} from "../components/auth/reducers/AuthContext";

function Router() {
    const {message, user} = useContext(AuthContext);
    const userLocal = getUserFromLocalStorage();

    return <>
        <Routes>
            <Route path="/" element={
                message === RESPONSE_MESSAGE.GET_PROFILE_FAILED ?
                    <Navigate to='/profile-update'/> : user && userLocal ? <Navigate to='/find'/> : <Home/>}/>
            <Route path='/find' element={message === RESPONSE_MESSAGE.GET_PROFILE_FAILED ?
                <Navigate to='/profile-update'/> : user && userLocal ? <FindPartner/> : <Navigate to='/'/>}/>
            <Route path="/profile-preference" element={message === RESPONSE_MESSAGE.GET_PROFILE_FAILED ?
                <Navigate to='/profile-update'/> : <PreferenceForm/>}/>
            <Route path='/profile-update' element={user && userLocal ? <UpdateProfileForm/> : <Navigate to='/'/>}/>
            <Route path='/list-match' element={message === RESPONSE_MESSAGE.GET_PROFILE_FAILED ?
                <Navigate to='/profile-update'/> : <ListPartner/>}/>
        </Routes>
    </>;
}

export default Router;