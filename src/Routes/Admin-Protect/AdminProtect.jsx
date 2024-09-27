import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AdminProtect({children}) {

    const role = sessionStorage.getItem('f_tkn');

    return role === 'admin' ? children : <Navigate to={'/loginAdmin'} />

}
