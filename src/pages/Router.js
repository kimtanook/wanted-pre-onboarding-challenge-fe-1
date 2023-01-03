import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="auth/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
