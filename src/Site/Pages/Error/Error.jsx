import React from 'react';

import { TbFaceIdError } from "react-icons/tb";

import errCSS from './error.module.css';
import { Link } from 'react-router-dom';

export default function Error() {

    return <React.Fragment>

        <div className={errCSS.container}>

            <TbFaceIdError className={errCSS.icon} />

            <div className={errCSS.text_cont}>

                <p>Sorry, we can't find the page you're looking for or an unexpected error occurred. Please try again later.</p>

                <Link to={'/'}>Return to the homepage</Link>

            </div>

        </div>

    </React.Fragment>

}
