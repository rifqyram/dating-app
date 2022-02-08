import React, {useContext} from 'react';
import Home from '../components/Home/Home';
import {Navigate, Route, Routes} from "react-router-dom";
import UpdateProfileForm from "../components/auth/components/UpdateProfileForm";
import {getUserFromLocalStorage} from "../components/auth/services/AuthService";
import PreferenceForm from "../components/auth/components/PreferenceForm";
import FindPartner from "../components/partner/components/FindPartner";
import ListPartner from "../components/partner/components/ListPartner";
import {GlobalContext} from "../context/GlobalContext";

function Router() {
    const {user} = useContext(GlobalContext);
    const userLocal = getUserFromLocalStorage();

    return <>
        <Routes>
            <Route path="/" element={user && userLocal ? <Navigate to='/find'/> : <Home/>}/>
            <Route path='/find' element={user && userLocal ? <FindPartner/> : <Navigate to='/'/>}/>
            <Route path="/profile-preference" element={user && userLocal ? <PreferenceForm/> : <Navigate to='/'/>}/>
            <Route path='/profile-update' element={user && userLocal ? <UpdateProfileForm/> : <Navigate to='/'/>}/>
            <Route path='/list-match' element={user && userLocal ? <ListPartner/> : <Navigate to='/'/>}/>
        </Routes>
    </>;
}

export default Router;