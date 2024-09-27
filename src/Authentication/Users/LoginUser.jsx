import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import logCSS from '../../Styles/forms.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ThreeCircles } from 'react-loader-spinner';
import Status from '../../Components/Common/Status/Status';

export default function LoginUser() {

    // ====== send-fake-data ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        userEmail : '',
        password : '',

    }

    const logSubmit = (values) => {

        sessionStorage.setItem('f_tkn' , 'user');

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccessMsg('Welcome on the site as user');
        }, 1500);

        setTimeout(() => {
            navigate('/')
        }, 5300);

        console.log(values);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : logSubmit ,

        validate : (values) => {

            const errors = {};

            if(!values.userEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.userEmail = 'Email is valid';
            }
            if(values.userEmail.length === 0){
                errors.userEmail = 'Email is required';
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

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.div variants={parentVariants} initial='hidden' animate='visible' className={logCSS.container}>

            <motion.h3 variants={toBottomVariants} className={logCSS.h3}>User Login</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={logCSS.form}
            >

                <div style={{opacity : loading ? 0.6 : 1}} className={logCSS.input_cont}>

                    <div className={logCSS.loader}></div>

                    <label htmlFor="userEmail">
                        <span id={logCSS.span} >User Email :</span>
                        {formikObj.errors.userEmail && formikObj.touched.userEmail && 
                            <span className={logCSS.err_msg}>* {formikObj.errors.userEmail}</span>
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

                <div style={{opacity : loading ? 0.6 : 1}} className={logCSS.input_cont}>

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

                <Link style={{opacity : loading ? 0.6 : 1}} to={'/registerUser'} className={logCSS.login_link}>
                    Don't have an account ?
                </Link>

                <motion.button 
                    style={{opacity : loading ? 0.6 : 1}} 
                    whileTap={{scale : 0.98}} 
                    className={logCSS.submit} type='submit'
                >
                    {loading ? <ThreeCircles
                        visible={true} height="20" width="20" color="var(--text-color-2)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : 
                        'Submit'
                    }
                </motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
