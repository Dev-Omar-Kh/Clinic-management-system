import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './Authentication/Users/RegisterUser';
import LoginUser from './Authentication/Users/LoginUser';
import LoginAdmin from './Authentication/Admins/LoginAdmin';
import RegisterDoc from './Authentication/Doctors/RegisterDoc';
import LoginDoc from './Authentication/Doctors/LoginDoc';
import ChatLayout from './Layouts/Chats/ChatLayout';
import DocChat from './Site/Pages/Doctors-Chat/Doc-Chat/DocChat';

const routes = createBrowserRouter([

    {path : '/registerUser' , element : <RegisterUser />},
    {path : '/registerDoctor' , element : <RegisterDoc />},
    {path : '/loginDoc' , element : <LoginDoc />},
    {path : '/loginUser' , element : <LoginUser />},
    {path : '/loginAdmin' , element : <LoginAdmin />},
    
    {path : '/doctors/chat' , element : <ChatLayout /> , children : [

        {path : '/doctors/chat' , element : <DocChat />}

    ]},

]);

export default function App() {

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}
