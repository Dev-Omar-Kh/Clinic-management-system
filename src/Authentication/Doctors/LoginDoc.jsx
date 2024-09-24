import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import logCSS from '../../Styles/forms.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export default function LoginDoc() {

    // ====== send-fake-data ====== //

    const values = {

        doctorEmail : '',
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

            if(!values.doctorEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.doctorEmail = 'Email is valid';
            }
            if(values.doctorEmail.length === 0){
                errors.doctorEmail = 'Email is required';
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

            <motion.h3 variants={toBottomVariants} className={logCSS.h3}>Doctor Login</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={logCSS.form}
            >

                <div className={logCSS.input_cont}>

                    <div className={logCSS.loader}></div>

                    <label htmlFor="doctorEmail">
                        <span id={logCSS.span} >Doctor Email :</span>
                        {formikObj.errors.doctorEmail && formikObj.touched.doctorEmail && 
                            <span className={logCSS.err_msg}>* {formikObj.errors.doctorEmail}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorEmail'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorEmail && formikObj.errors.doctorEmail ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorEmail}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter your email'
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

                <Link to={'/registerDoctor'} className={logCSS.login_link}>Don't have an account ?</Link>

                <motion.button whileTap={{scale : 0.98}} className={logCSS.submit} type='submit'>Submit</motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
