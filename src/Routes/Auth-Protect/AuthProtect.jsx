import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AuthProtect({children}) {

    const fakeToken = sessionStorage.getItem('f_tkn');

    return fakeToken ? children : <Navigate to={'/registerUser'} />

}
