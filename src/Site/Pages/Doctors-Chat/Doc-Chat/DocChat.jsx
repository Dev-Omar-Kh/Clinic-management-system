import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Pusher from 'pusher-js';

import { HiUsers } from "react-icons/hi2";
import { FaRegImage } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";

import chatCSS from './doc.module.css';
import { motion } from 'framer-motion';
import { fakePatients } from '../FakeUsers';

export default function DocChat() {

    // ====== patent-info ====== //

    const {id} = useParams();

    const patient = fakePatients.find(user => user.id === Number(id));

    // ====== manage-messages-with-pusher ====== //

    const [messagesData, setMessagesData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [fileType, setFileType] = useState(false);
    const [fileName, setFileName] = useState(null);

    const chatEndRef = useRef(null);

    // ======= pusher-connect ====== //

    useEffect(() => {

        const pusher = new Pusher('e2bf8122b2a6af6543a0', {

            cluster: 'eu'

        });
        const channel = pusher.subscribe('chat');

        channel.bind('message', (data) => {

            if(data.patientId === Number(id)) {

                setMessagesData(prevMessages => [...prevMessages, data]);

            }

        });

        return () => {

            channel.unbind_all();
            channel.unsubscribe();

        };

    } , [id]);

    // ====== fake-messages-users ====== //

    useEffect(() => {

        setMessagesData([

            { patientId: Number(id), sender: 'patient', text: `Hi, My name is ${patient.name} and i'm 19 years old ... i love games, anime and swimming`, time: '11:59 PM' },
            { patientId: Number(id), sender: 'doctor', text: `Hi ${patient.name.split(' ').slice(0 , 1)}, that's good`, time: '11:59 PM' }

        ])

    } , [id , patient]);

    // ====== go-to-the-last-message ====== //

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [messagesData]);

    // ====== send-message ====== //

    const sendMessage = (e) => {

        e.preventDefault();

        const text = e.target.elements.message.value;

        if(text.length > 0 || selectedImage || fileName){

            const message = {

                patientId: Number(id),
                sender: 'doctor',
                text,
                image: selectedImage,
                fileName: fileName,
                fileType: fileType,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),

            };
            
            setMessagesData(prevMessages => [...prevMessages, message]);

            e.target.reset();

            setSelectedImage(null); 
            setFileName(null);
            setFileType(false)

        }
        else{
            setErrorMessage("Can't send an empty message");
            setTimeout(() => {
                setErrorMessage(null);
            } , 1500)
        }

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            if(file.type.startsWith('image/')){

                setSelectedImage(URL.createObjectURL(file));

            }
            else{
                setSelectedImage(null);
                setFileType(true);
                setFileName(file.name);
            }

        }

    };

    // ====== handle-enter-key ====== //

    const handleKeyPress = (e) => {

        if (e.key === 'Enter' && !e.shiftKey) {

            e.preventDefault();
            e.target.form.requestSubmit();

        }

    };

    // ====== context-for-display-patients ====== //

    const setDisplay = useOutletContext();

    return <React.Fragment>

        <div className={chatCSS.container}>

            <div className={chatCSS.info_box}>

                <div className={chatCSS.main_info}>

                    <div className={chatCSS.m_img}>
                        <img src={require('../../../../Images/user_img.png')} alt="" />
                    </div>

                    <p className={chatCSS.m_p}>{patient.name}</p>

                </div>

                <div onClick={() => setDisplay(true)} className={chatCSS.burger}>
                    <HiUsers />
                </div>

            </div>

            <div className={chatCSS.chat_box}>

                {messagesData.filter(msg => msg.patientId === Number(id)).map((msg , idx) => <motion.div
                    key={idx} 
                    initial={{opacity : 0 , scale : 0.85 , y : 20}}
                    animate={{opacity : 1 , scale : 1 , y : 0}}
                    transition={{duration : 0.3}}
                    className={msg.sender === 'doctor' ? chatCSS.doctor_msg : chatCSS.patient_msg}
                >

                    <div className={chatCSS.patient_det}>
                        <p>~ {msg.sender}</p>
                    </div>

                    <div className={chatCSS.msg_content}>

                        {msg.image && <img src={msg.image} alt="sent" className={chatCSS.sent_image} />}

                        {msg.fileName && msg.fileType && <div className={chatCSS.file_sent}>

                            <FiLink className={chatCSS.file_icon} />
                            <p>{msg.fileName}</p>

                        </div>}

                        {msg.text && <p>{msg.text}</p>}
                    </div>

                    <div className={chatCSS.msg_ctrl}>

                        <div className={chatCSS.msg_time}>
                            {msg.time}
                        </div>

                        <div className={chatCSS.msg_seen}>
                            <FaCheck />
                        </div>

                    </div>

                </motion.div> )}

                <div ref={chatEndRef} /> 

            </div>

            <form onSubmit={sendMessage} className={chatCSS.chat_tools_box}>

                {selectedImage && <motion.div 
                    className={chatCSS.display_img}
                    initial={{opacity : 0 , scale : 0}} animate={{opacity : 1 , scale : 1}}
                    transition={{duration : 0.3}}
                >

                    <img src={selectedImage} alt="view_image" />

                </motion.div>}

                {fileName && <motion.div 
                    className={chatCSS.check_file}
                    initial={{opacity : 0 , scale : 0}} animate={{opacity : 1 , scale : 1}}
                    transition={{duration : 0.3}}
                >

                    <FiLink />
                    <p className={chatCSS.check_name}>{fileName}</p>

                </motion.div>}

                <div className={chatCSS.file_upload}>
                    <label htmlFor="img">
                        <FaRegImage />
                        <input type="file" id='img' onChange={handleImageChange} />
                    </label>
                </div>

                <span className={chatCSS.line}></span>

                <div className={chatCSS.chat_input}>
                    <textarea 
                        name="message" type="text" 
                        onKeyDown={handleKeyPress}
                        placeholder={errorMessage ? errorMessage : 'Write a message ...'} 
                    />
                </div>

                <span className={chatCSS.line}></span>

                <button type='submit' className={chatCSS.button_send}>
                    <BsSend />
                </button>

            </form>

        </div>

    </React.Fragment>

}
