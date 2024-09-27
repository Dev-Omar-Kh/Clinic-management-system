import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import regCss from '../../Styles/forms.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ThreeCircles } from 'react-loader-spinner';
import Status from '../../Components/Common/Status/Status';

export default function RegisterDoc() {

    // ====== send-fake-data ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        doctorName : '',
        doctorEmail : '',
        doctorSpecialty : '',
        doctorPhone : '',
        doctorLocation : '',
        password : '',
        confirmPassword : '',

    }

    const regSubmit = (values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccessMsg('Account created successfully');
        }, 1500);

        setTimeout(() => {
            navigate('/loginDoc')
        }, 5300);

        console.log(values);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : regSubmit ,

        validate : (values) => {

            const errors = {};

            if(values.doctorName.length < 3){
                errors.doctorName = "Name is too short";
            }
            if(values.doctorName.length === 0){
                errors.doctorName = "Name is required";
            }
            if(values.doctorName.length > 50){
                errors.doctorName = "Name is too long";
            }

            if(!values.doctorEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.doctorEmail = 'Email is valid';
            }
            if(values.doctorEmail.length === 0){
                errors.doctorEmail = 'Email is required';
            }

            if(values.doctorSpecialty.length < 3){
                errors.doctorSpecialty = "Specialty is too short";
            }
            if(values.doctorSpecialty.length === 0){
                errors.doctorSpecialty = "Specialty is required";
            }
            if(values.doctorSpecialty.length > 100){
                errors.doctorSpecialty = "Specialty is too long";
            }

            if(!values.doctorPhone.match(/^01[0125]\d{8}$/)){
                errors.doctorPhone = 'Phone is valid';
            }
            if(values.doctorPhone.length === 0){
                errors.doctorPhone = 'Phone is required';
            }

            if(values.doctorLocation.length < 3){
                errors.doctorLocation = 'Location is too short';
            }
            if(values.doctorLocation.length === 0){
                errors.doctorLocation = 'Location is required';
            }
            if(values.doctorLocation.length > 100){
                errors.doctorLocation = 'Location is too long';
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

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.div variants={parentVariants} initial='hidden' animate='visible' className={regCss.container}>

            <motion.h3 variants={toBottomVariants} className={regCss.h3}>Doctor register</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={regCss.form}
            >

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="doctorName">
                        <span id={regCss.span} >Doctor Name :</span>
                        {formikObj.errors.doctorName && formikObj.touched.doctorName && 
                            <span className={regCss.err_msg}>* {formikObj.errors.doctorName}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorName'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorName && formikObj.errors.doctorName ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorName}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter your name'
                    />

                </div>

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="doctorEmail">
                        <span id={regCss.span} >Doctor Email :</span>
                        {formikObj.errors.doctorEmail && formikObj.touched.doctorEmail && 
                            <span className={regCss.err_msg}>* {formikObj.errors.doctorEmail}</span>
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

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="doctorSpecialty">
                        <span id={regCss.span} >Doctor Specialty :</span>
                        {formikObj.errors.doctorSpecialty && formikObj.touched.doctorSpecialty && 
                            <span className={regCss.err_msg}>* {formikObj.errors.doctorSpecialty}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorSpecialty'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorSpecialty && formikObj.errors.doctorSpecialty ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorSpecialty}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter your specialty'
                    />

                </div>

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="doctorPhone">
                        <span id={regCss.span} >Doctor Phone :</span>
                        {formikObj.errors.doctorPhone && formikObj.touched.doctorPhone && 
                            <span className={regCss.err_msg}>* {formikObj.errors.doctorPhone}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorPhone'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorPhone && formikObj.errors.doctorPhone ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorPhone}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="tel" placeholder='Enter your phone'
                    />

                </div>

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

                    <div className={regCss.loader}></div>

                    <label htmlFor="doctorLocation">
                        <span id={regCss.span} >Clinic Location :</span>
                        {formikObj.errors.doctorLocation && formikObj.touched.doctorLocation && 
                            <span className={regCss.err_msg}>* {formikObj.errors.doctorLocation}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorLocation'
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorLocation && formikObj.errors.doctorLocation ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorLocation}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="tel" placeholder='EXP : Cairo , Aswan , etc...'
                    />

                </div>

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

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

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.input_cont + ' ' + regCss.half_cont}>

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

                <Link style={{opacity : loading ? 0.6 : 1}} to={'/loginDoc'} className={regCss.login_link}>
                    Do you already have an account ?
                </Link>

                <div style={{opacity : loading ? 0.6 : 1}} className={regCss.navigate_forms}>

                    <p>Go to registration :</p>
                    <Link to={'/registerUser'}>As a User</Link>
                    <Link to={'/loginAdmin'}>As a Admin</Link>

                </div>

                <motion.button 
                    style={{opacity : loading ? 0.6 : 1}} 
                    whileTap={{scale : 0.98}} 
                    className={regCss.submit} type='submit'
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
