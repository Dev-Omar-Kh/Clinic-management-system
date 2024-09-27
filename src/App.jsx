import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './Authentication/Users/RegisterUser';
import LoginUser from './Authentication/Users/LoginUser';
import LoginAdmin from './Authentication/Admins/LoginAdmin';
import RegisterDoc from './Authentication/Doctors/RegisterDoc';
import LoginDoc from './Authentication/Doctors/LoginDoc';
import ChatLayout from './Layouts/Chats/ChatLayout';
import DocChat from './Site/Pages/Doctors-Chat/Doc-Chat/DocChat';
import AdminLayout from './Layouts/Admin/AdminLayout';
import DoctorsDB from './Admin/Pages/Doctors/DoctorsDB';
import UpdateDoc from './Admin/Pages/Doctors/UpdateDoc';
import UsersDB from './Admin/Pages/Users/UsersDB';
import Error from './Site/Pages/Error/Error';
import Home from './Site/Pages/Home/Home';
import AuthProtect from './Routes/Auth-Protect/AuthProtect';
import AdminProtect from './Routes/Admin-Protect/AdminProtect';
import DocProtect from './Routes/Doctor-Protect/DocProtect';

const routes = createBrowserRouter([

    // ====== home-rout ====== //

    {path : '/' , element : <AuthProtect><Home /></AuthProtect>},

    // ====== auth-rout ====== //

    {path : '/registerUser' , element : <RegisterUser />},
    {path : '/registerDoctor' , element : <RegisterDoc />},
    {path : '/loginDoc' , element : <LoginDoc />},
    {path : '/loginUser' , element : <LoginUser />},
    {path : '/loginAdmin' , element : <LoginAdmin />},

    // ====== dash-board-rout ====== //

    {path : '/admin' , element : <AdminProtect><AdminLayout /></AdminProtect> , children : [

        {path : '/admin' , element : <Home message={'Admin'} height={'percent'} />},
        {path : '/admin/doctors' , element : <DoctorsDB /> , children : [

            {path : 'updateDoc/:id' , element : <UpdateDoc />}

        ]},
        {path : '/admin/users' , element : <UsersDB />},

    ]},

    // ====== chat-doctors ====== //
    
    {path : '/doctors/chat' , element : <DocProtect><ChatLayout /></DocProtect> , children : [

        {path : '/doctors/chat' , element : <Home color={'white'} message={'Doctor'} height={'percent'} />},
        {path : ':id' , element : <DocChat />},

    ]},

    // ====== error-rout ====== //

    {path : '*' , element : <Error />}

]);

export default function App() {

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}
