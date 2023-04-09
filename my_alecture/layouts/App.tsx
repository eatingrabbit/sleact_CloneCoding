import React from 'react';
import loadable from '@loadable/component'
import {Routes, Route, Navigate} from 'react-router-dom';
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));

// react-router-dom 버전6은 switch 지원 x => routes로 바꿈

const App=()=>{
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes> 
    );
};

export default App;