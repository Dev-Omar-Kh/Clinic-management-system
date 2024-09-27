import React from 'react'
import { BiErrorAlt } from 'react-icons/bi';

import usersCSS from '../../../Styles/table.module.css'
import { FaUsersViewfinder } from 'react-icons/fa6';

export default function UsersDB() {

    return <React.Fragment>

        <div className={usersCSS.container}>

            <div id='title' className={usersCSS.title}>

                <div className={usersCSS.title_box}>

                    <FaUsersViewfinder />
                    <p>Users</p>

                </div>

            </div>

            <div className={usersCSS.empty_doc}>

                <BiErrorAlt />
                <h3>No users data yet</h3>

            </div>

        </div>

    </React.Fragment>

}
