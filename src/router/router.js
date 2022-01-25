import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from '../components/layout/Home';
import LoginForm from "../components/auth/components/LoginForm";
import RegisterForm from "../components/auth/components/RegisterForm";
import UpdateProfileForm from "../components/auth/components/UpdateProfileForm";

function Router() {
    return <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/update-profile" element={<UpdateProfileForm />} />
        </Routes>
    </>;
}

export default Router;