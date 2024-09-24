import React, { useState } from 'react';
import classNames from 'classnames';

import chatCSS from './chat.module.css';
import DocPatient from '../../Site/Pages/Doctors-Chat/Patient-List/DocPatient';
import { Outlet } from 'react-router-dom';

export default function ChatLayout() {

    const [displayNav, setDisplayNav] = useState(false);

    return <React.Fragment>

        <div className={chatCSS.container}>

            <div className={classNames(chatCSS.patient_list, { [chatCSS.display_nav]: displayNav })}>

                <DocPatient display={setDisplayNav} />

            </div>

            <div className={chatCSS.chat_container}>

                <Outlet context={setDisplayNav} />

            </div>

        </div>

    </React.Fragment>

}
