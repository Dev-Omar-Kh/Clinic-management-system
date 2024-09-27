import React from 'react'
import { Navigate } from 'react-router-dom';

export default function DocProtect({children}) {

    const role = sessionStorage.getItem('f_tkn');

    return role !== 'user' ? children : <Navigate to={'/registerDoctor'} />

}
