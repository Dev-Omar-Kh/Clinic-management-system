import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import regCss from '../../Styles/forms.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

export default function RegisterUser() {

    // ====== send-fake-data ====== //

    const values = {

        userName : '',
        userEmail : '',
        userPhone : '',
        userLocation : '',
        password : '',
        confirmPassword : '',

    }

    const regSubmit = (values) => {

        console.log(values);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : regSubmit ,

        validate : (values) => {

            const errors = {};

            if(values.userName.length < 3){
                errors.userName = "Name is too short";
            }
            if(values.userName.length === 0){
                errors.userName = "Name is required";
            }
            if(values.userName.length > 50){
                errors.userName = "Name is too long";
            }

            if(!values.userEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.userEmail = 'Email is valid';
            }
            if(values.userEmail.length === 0){
                errors.userEmail = 'Email is required';
            }

            if(!values.userPhone.match(/^01[0125]\d{8}$/)){
                errors.userPhone = 'Phone is valid';
            }
            if(values.userPhone.length === 0){
                errors.userPhone = 'Phone is required';
            }

            if(values.userLocation.length < 3){
                errors.userLocation = 'Location is too short';
            }
            if(values.userLocation.length === 0){
                errors.userLocation = 'Location is required';
            }
            if(values.userLocation.length > 100){
                errors.userLocation = 'Location is too long';
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

            if(values.confirmPassword !== values.password){
                errors.confirmPassword = 'It must match the password';
            }
            if(values.confirmPassword.length === 0){
                errors.confirmPassword = 'Confirmation is required';
            }

            return errors;

        }

    });

    // ====== display-eyes ====== //

    const [eyeCont1, setEyeCont1] = useState(false);
    const [eyeCont2, setEyeCont2] = useState(false);

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

        <motion.div variants={parentVariants} initial='hidden' animate='visible' className={regCss.container}>

            <motion.h3 variants={toBottomVariants} className={regCss.h3}>User register</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={regCss.form}
            >

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="userName">
                        <span id={regCss.span} >User Name :</span>
                        {formikObj.errors.userName && formikObj.touched.userName && 
                            <span className={regCss.err_msg}>* {formikObj.errors.userName}</span>
                        }
                    </label>
                    <motion.input 
                        id='userName'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.userName && formikObj.errors.userName ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.userName}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter your name'
                    />

                </div>

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="userEmail">
                        <span id={regCss.span} >User Email :</span>
                        {formikObj.errors.userEmail && formikObj.touched.userEmail && 
                            <span className={regCss.err_msg}>* {formikObj.errors.userEmail}</span>
                        }
                    </label>
                    <motion.input 
                        id='userEmail'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.userEmail && formikObj.errors.userEmail ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.userEmail}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter your email'
                    />

                </div>

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="userPhone">
                        <span id={regCss.span} >User Phone :</span>
                        {formikObj.errors.userPhone && formikObj.touched.userPhone && 
                            <span className={regCss.err_msg}>* {formikObj.errors.userPhone}</span>
                        }
                    </label>
                    <motion.input 
                        id='userPhone'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.userPhone && formikObj.errors.userPhone ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.userPhone}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="tel" placeholder='Enter your phone'
                    />

                </div>

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="userLocation">
                        <span id={regCss.span} >User Location :</span>
                        {formikObj.errors.userLocation && formikObj.touched.userLocation && 
                            <span className={regCss.err_msg}>* {formikObj.errors.userLocation}</span>
                        }
                    </label>
                    <motion.input 
                        id='userLocation'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.userLocation && formikObj.errors.userLocation ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.userLocation}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="tel" placeholder='EXP : Cairo , Aswan , etc...'
                    />

                </div>

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.eyes_cont} onClick={() => setEyeCont1(!eyeCont1)}>
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
                        <span id={regCss.span} >Password :</span>
                        {formikObj.errors.password && formikObj.touched.password && 
                            <span className={regCss.err_msg}>* {formikObj.errors.password}</span>
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

                <div className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.eyes_cont} onClick={() => setEyeCont2(!eyeCont2)}>
                        <AnimatePresence>
                            {eyeCont2 ? 
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
                        <span id={regCss.span} >Confirm Password :</span>
                        {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && 
                            <span className={regCss.err_msg}>* {formikObj.errors.confirmPassword}</span>
                        }
                    </label>
                    <motion.input 
                        id='confirmPassword'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.confirmPassword && formikObj.errors.confirmPassword ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.confirmPassword}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type={eyeCont2 ? "text" : "password"} placeholder='Repeat the password'
                    />

                </div>

                <Link to={'/loginUser'} className={regCss.login_link}>Do you already have an account ?</Link>

                <div className={regCss.navigate_forms}>

                    <p>Go to registration :</p>
                    <Link to={'/registerDoctor'}>As a Doctor</Link>
                    <Link to={'/loginAdmin'}>As a Admin</Link>

                </div>

                <motion.button whileTap={{scale : 0.98}} className={regCss.submit} type='submit'>Submit</motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
