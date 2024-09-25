import React from 'react';
import { NavLink } from 'react-router-dom';
import { fakePatients } from '../FakeUsers';

import { BsChatText } from "react-icons/bs";
import { FaRegRectangleXmark } from "react-icons/fa6";

import patientCSS from './patient.module.css';
import './active.css' 

export default function DocPatient({display}) {

    return <React.Fragment>

        <div className={patientCSS.container}>

            <div className={patientCSS.title}>

                <div className={patientCSS.title_det}>
                    <BsChatText />
                    <p>Chats</p>
                </div>

                <FaRegRectangleXmark onClick={() => display(false)} className={patientCSS.close_icon} />

            </div>

            <div className={patientCSS.chats_cont}>

                {fakePatients.map((user , idx) => <NavLink 
                    key={idx} to={`/doctors/chat/${user.id}`} 
                    onClick={() => display(false)} className={'chat_select ' +patientCSS.p_box}
                >
                    <div className={patientCSS.p_img}>
                        <img src={require('../../../../Images/user_img.png')} alt="" />
                    </div>
                    <p className={patientCSS.p_name}>{user.name}</p>
                    <span className={patientCSS.p_note}>1</span>
                </NavLink>)}

            </div>

        </div>

    </React.Fragment>

}
