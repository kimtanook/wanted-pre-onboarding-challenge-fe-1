import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Detail from './Detail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="auth/signin" element={<SignIn />} />
        <Route path="/todos/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
