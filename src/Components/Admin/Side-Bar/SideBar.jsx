import React from 'react'
import { NavLink } from 'react-router-dom';

import { FaUsersViewfinder } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";

import sideCSS from './sidebar.module.css';
import './active.css'

export default function SideBar({display}) {

    return <React.Fragment>

        <div className={sideCSS.container}>

            <div className={sideCSS.logo}>
                DB
            </div>

            <nav className={sideCSS.nav}>

                <ul>

                    <NavLink to={'doctors'} onClick={() => display(false)} className='side_bar_links'>
                        <FaUserDoctor className={sideCSS.side_bar_icon} />
                        <li>Doctors</li>
                    </NavLink>

                    <NavLink to={'users'} onClick={() => display(false)} className='side_bar_links'>
                        <FaUsersViewfinder className={sideCSS.side_bar_icon} />
                        <li>Users</li>
                    </NavLink>

                </ul>

            </nav>

        </div>

    </React.Fragment>

}
