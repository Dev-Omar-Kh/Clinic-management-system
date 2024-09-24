import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import logCSS from '../../Styles/forms.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export default function LoginAdmin() {

    // ====== send-fake-data ====== //

    const values = {

        adminEmail : '',
        password : '',

    }

    const logSubmit = (values) => {

        console.log(values);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : logSubmit ,

        validate : (values) => {

            const errors = {};

            if(!values.adminEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.adminEmail = 'Email is valid';
            }
            if(values.adminEmail.length === 0){
                errors.adminEmail = 'Email is required';
            }

            if(values.password.length < 6){
                errors.password = 'Password is too short';
            }
            if(values.password.length === 0){
                errors.password = 'Password is required';
            }
            if(values.password.length > 18){
                errors.password = 'Password is too long';
            }

            return errors;

        }

    });

    // ====== display-eyes ====== //

    const [eyeCont1, setEyeCont1] = useState(false);

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren'}}

    }

    const toBottomVariants = {

        hidden : {opacity : 0 , y : -20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}}

    }

    const toTopVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}}

    }

    const eyeVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' className={logCSS.container}>

            <motion.h3 variants={toBottomVariants} className={logCSS.h3}>Admin Login</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={logCSS.form}
            >

                <div className={logCSS.input_cont}>

                    <div className={logCSS.loader}></div>

                    <label htmlFor="adminEmail">
                        <span id={logCSS.span} >Admin Email :</span>
                        {formikObj.errors.adminEmail && formikObj.touched.adminEmail && 
                            <span className={logCSS.err_msg}>* {formikObj.errors.adminEmail}</span>
                        }
                    </label>
                    <motion.input 
                        id='adminEmail'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.adminEmail && formikObj.errors.adminEmail ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.adminEmail}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter the admin email'
                    />

                </div>

                <div className={logCSS.input_cont}>

                    <div className={logCSS.eyes_cont} onClick={() => setEyeCont1(!eyeCont1)}>
                        <AnimatePresence>
                            {eyeCont1 ? 
                                <motion.span key={'hidden1'} variants={eyeVariants}>
                                    <VisibilityOffOutlinedIcon />
                                </motion.span> 
                                :
                                <motion.span key={'show1'} variants={eyeVariants}>
                                    <VisibilityOutlinedIcon />
                                </motion.span>
                            }
                        </AnimatePresence>
                    </div>

                    <label htmlFor="password">
                        <span id={logCSS.span} >Password :</span>
                        {formikObj.errors.password && formikObj.touched.password && 
                            <span className={logCSS.err_msg}>* {formikObj.errors.password}</span>
                        }
                    </label>
                    <motion.input 
                        id='password'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.password && formikObj.errors.password ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.password}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type={eyeCont1 ? "text" : "password"} placeholder='Enter new password'
                    />

                </div>

                <Link to={'/registerUser'} className={logCSS.login_link}>Are you not an admin ?</Link>

                <motion.button whileTap={{scale : 0.98}} className={logCSS.submit} type='submit'>Submit</motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
