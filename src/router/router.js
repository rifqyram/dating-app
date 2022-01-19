import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/layout/Home';
import LoginForm from "../components/auth/components/LoginForm";

function Router() {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" />
        </Routes>
    </>;
}

export default Router;;
