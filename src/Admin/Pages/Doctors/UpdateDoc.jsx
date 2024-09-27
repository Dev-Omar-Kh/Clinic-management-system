import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { FakeDoctors } from './FakeDoctors';
import { useNavigate, useParams } from 'react-router-dom';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

import updateCSS from '../../../Styles/forms.module.css';

export default function UpdateDoc() {

    // ====== get-doctor-for-update ====== //

    const {id} = useParams();

    const doctorData = FakeDoctors.find(doc => doc.id === Number(id));

    // ====== send-fake-data ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        doctorName : doctorData.name || '',
        doctorEmail : doctorData.email || '',
        doctorSpecialty : doctorData.specialty || '',
        doctorPhone : doctorData.phone || '',
        doctorLocation : doctorData.location || '',

    }

    const updateSubmit = (values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setErrMsg('No data changed');
        }, 1500);

        setTimeout(() => {
            navigate('/admin/doctors')
        }, 5300);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : updateSubmit ,

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

            return errors;

        }

    });

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

    // ====== custom-style ====== //

    const container = {

        width: '100%',
        minHeight: '100%',
        padding: '50px 4.5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '50px',
        overflow : 'auto',

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.div style={container} variants={parentVariants} initial='hidden' animate='visible' className={updateCSS.scrolling}>

            <motion.h3 variants={toBottomVariants} className={updateCSS.h3}>Doctor Data</motion.h3>

            <motion.form 
                onSubmit={formikObj.handleSubmit}
                variants={toTopVariants} className={updateCSS.form}
            >

                <div style={{ opacity: loading ? 0.6 : 1 }} className={updateCSS.input_cont + ' ' + updateCSS.half_cont}>

                    <div className={updateCSS.loader}></div>

                    <label htmlFor="doctorName">
                        <span id={updateCSS.span} >Doctor Name :</span>
                        {formikObj.errors.doctorName && formikObj.touched.doctorName && 
                            <span className={updateCSS.err_msg}>* {formikObj.errors.doctorName}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorName'
                        disabled={loading}
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorName && formikObj.errors.doctorName ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorName}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter doctor name'
                    />

                </div>

                <div style={{ opacity: loading ? 0.6 : 1 }} className={updateCSS.input_cont + ' ' + updateCSS.half_cont}>

                    <div className={updateCSS.loader}></div>

                    <label htmlFor="doctorEmail">
                        <span id={updateCSS.span} >Doctor Email :</span>
                        {formikObj.errors.doctorEmail && formikObj.touched.doctorEmail && 
                            <span className={updateCSS.err_msg}>* {formikObj.errors.doctorEmail}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorEmail'
                        disabled={loading}
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorEmail && formikObj.errors.doctorEmail ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorEmail}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter doctor email'
                    />

                </div>

                <div style={{ opacity: loading ? 0.6 : 1 }} className={updateCSS.input_cont  + ' ' + updateCSS.half_cont}>

                    <div className={updateCSS.loader}></div>

                    <label htmlFor="doctorSpecialty">
                        <span id={updateCSS.span} >Doctor Specialty :</span>
                        {formikObj.errors.doctorSpecialty && formikObj.touched.doctorSpecialty && 
                            <span className={updateCSS.err_msg}>* {formikObj.errors.doctorSpecialty}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorSpecialty'
                        disabled={loading}
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorSpecialty && formikObj.errors.doctorSpecialty ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorSpecialty}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="text" placeholder='Enter doctor specialty'
                    />

                </div>

                <div style={{ opacity: loading ? 0.6 : 1 }} className={updateCSS.input_cont + ' ' + updateCSS.half_cont}>

                    <div className={updateCSS.loader}></div>

                    <label htmlFor="doctorPhone">
                        <span id={updateCSS.span} >Doctor Phone :</span>
                        {formikObj.errors.doctorPhone && formikObj.touched.doctorPhone && 
                            <span className={updateCSS.err_msg}>* {formikObj.errors.doctorPhone}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorPhone'
                        disabled={loading}
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.doctorPhone && formikObj.errors.doctorPhone ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.doctorPhone}
                        whileFocus={{borderColor : 'var(--accent-color-1)'}} 
                        type="tel" placeholder='Enter doctor phone'
                    />

                </div>

                <div style={{ opacity: loading ? 0.6 : 1 }} className={updateCSS.input_cont + ' ' + updateCSS.half_cont}>

                    <div className={updateCSS.loader}></div>

                    <label htmlFor="doctorLocation">
                        <span id={updateCSS.span} >Clinic Location :</span>
                        {formikObj.errors.doctorLocation && formikObj.touched.doctorLocation && 
                            <span className={updateCSS.err_msg}>* {formikObj.errors.doctorLocation}</span>
                        }
                    </label>
                    <motion.input 
                        id='doctorLocation'
                        disabled={loading}
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

                <motion.button 
                    style={{ opacity: loading ? 0.6 : 1 }}
                    disabled={loading}
                    whileTap={{scale : 0.98}} className={updateCSS.submit} type='submit'
                >

                    {loading ? <ThreeCircles
                        visible={true} height="20" width="20" color="var(--text-color-2)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : 
                        'Update'
                    }

                </motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
