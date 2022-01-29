import React, {useEffect, useState} from 'react';
import Home from '../components/layout/Home';
import LoginForm from "../components/auth/components/LoginForm";
import RegisterForm from "../components/auth/components/RegisterForm";
import {Route, Routes, Navigate} from "react-router-dom";
import UpdateProfileForm from "../components/auth/components/UpdateProfileForm";
import {getProfileAfterUpdate, getUserFromLocalStorage} from "../components/auth/services/AuthService";
import {useNavigate} from "react-router";
import PreferenceForm from "../components/auth/components/PreferenceForm";
import CardPartner from "../components/partner/components/CardPartner";
import UpdateProfileForm2 from "../components/auth2/components/UpdateProfileForm2";
import ProfilePreferenceForm2 from "../components/auth2/components/ProfilePreferenceForm2";

function Router({openDrawer, setOpenDrawer}) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function getCurrentProfile(memberId) {
        getProfileAfterUpdate(memberId)
            .then(r => {
                console.log()
            })
            .catch(({response: err}) => {
                if (err.status === 500) {
                    setError(true);
                    navigate("/profile-update")
                }
            });
    }

    useEffect(() => {
        if (getUserFromLocalStorage() !== null) {
            setUser(getUserFromLocalStorage())
        }
    }, [])

    useEffect(() => {
        if (getUserFromLocalStorage()?.memberId) {
            getCurrentProfile(getUserFromLocalStorage().memberId)
        }
    }, [])

    return <>
        <Routes>
            <Route path="/" element={
                <Home
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    user={user}
                    setUser={setUser}/>}/>
            <Route path='/dashboard' element={<CardPartner/>}/>
            <Route path="/profile-preference" element={<PreferenceForm/>}/>
            <Route path='/profile-update' element={<UpdateProfileForm/>}/>
            <Route path='/list-match' element={<div>cie</div>}/>
        </Routes>
    </>;
}

export default Router;