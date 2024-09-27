import React, { useEffect, useState } from 'react';
import Warning from '../../../Components/Common/Warning/Warning';
import { AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { FaUserDoctor } from 'react-icons/fa6';
import { MdDeleteOutline } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { CiEdit } from 'react-icons/ci';
import { FakeDoctors } from './FakeDoctors';

import doctorsCSS from '../../../Styles/table.module.css';

export default function DoctorsDB() {

    // ====== outlet ====== //

    const location = useLocation();

    // ====== delete-doctor ====== //

    const [fakeDocData, setFakeDocData] = useState(FakeDoctors);
    const [displayWarn, setDisplayWarn] = useState(false);
    const [doctorData, setDoctorData] = useState(null);
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const firstDeleteStep = (data) => {

        setDisplayWarn(true);
        setDoctorData(data);

    }

    useEffect(() => {

        if(deleteDoctor){

            console.log(deleteDoctor);

            setFakeDocData(fakeDocData.filter(doc => doc.id !== deleteDoctor));
            setDisplayWarn(false);
            setDoctorData(null);
            setDeleteDoctor(null);


        }

    } , [deleteDoctor , fakeDocData])

    // ====== title-height ====== //

    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {

        const title = document.getElementById('title');

        if(title){

            setTitleHeight(title.offsetHeight);

        }

    } , []);

    return <React.Fragment>

        <AnimatePresence>
            {displayWarn && 
                <Warning
                    cancel={setDisplayWarn}
                    deleteData={setDeleteDoctor}
                    data={doctorData}
                />
            }
        </AnimatePresence>

        {location.pathname.includes('updateDoc') ? <Outlet /> : <div className={doctorsCSS.container}>

            <div id='title' className={doctorsCSS.title}>

                <div className={doctorsCSS.title_box}>

                    <FaUserDoctor />
                    <p>Doctors</p>

                </div>

            </div>

            <div 
                className={doctorsCSS.table_cont}
                style={titleHeight ? {height : `calc(100% - calc(${titleHeight}px + 30px))`} : {}} 
            >

                {fakeDocData.length > 0 ?
                    <table className={doctorsCSS.table}>

                        <thead>

                            <tr>

                                <th>D. Name</th>
                                <th>D. Specialty</th>
                                <th>D. Location</th>
                                <th>D. Email</th>
                                <th>D. Phone</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {fakeDocData.map(doc => <tr key={doc.id}>

                                <td>{doc.name}</td>
                                <td>{doc.specialty}</td>
                                <td>{doc.location}</td>
                                <td>{doc.email}</td>
                                <td>{doc.phone}</td>
                                <td>
                                    <button 
                                        onClick={() => firstDeleteStep(doc)}
                                        className={`${doctorsCSS.actions} ${doctorsCSS.delete}`}
                                    >
                                        <MdDeleteOutline className={doctorsCSS.action_icon} />
                                    </button>
                                    <Link 
                                        to={`updateDoc/${doc.id}`}
                                        className={`${doctorsCSS.actions} ${doctorsCSS.edit}`}
                                    >
                                        <CiEdit className={doctorsCSS.action_icon} />
                                    </Link>
                                </td>

                            </tr>)}

                        </tbody>

                    </table> :
                    <div className={doctorsCSS.empty_doc}>

                        <BiErrorAlt />
                        <h3>No Doctors Data</h3>

                    </div>
                }

            </div>

        </div>}

    </React.Fragment>

}
