import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Pusher from 'pusher-js';

import { HiUsers } from "react-icons/hi2";
import { FaRegImage } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

import chatCSS from './doc.module.css';
import { motion } from 'framer-motion';

export default function DocChat() {

    // ====== manage-messages-with-pusher ====== //

    const [messagesData, setMessagesData] = useState([
        { sender: 'patient', text: "Hi, My name is omar khaled and i'm 19 years old ... i love games, anime and swimming", time: '11:59 PM' },
        { sender: 'doctor', text: 'Hi Omar, that\'s good', time: '11:59 PM' }
    ]);

    const [errorMessage, setErrorMessage] = useState(null);

    const chatEndRef = useRef(null);

    useEffect(() => {

        const pusher = new Pusher('e2bf8122b2a6af6543a0', {

            cluster: 'eu'

        });
        const channel = pusher.subscribe('chat');

        channel.bind('message', (data) => {

            setMessagesData(prevMessages => [...prevMessages, data]);

        });

        return () => {

            channel.unbind_all();
            channel.unsubscribe();

        };

    } , []);

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [messagesData]);

    const sendMessage = (e) => {

        e.preventDefault();

        if(e.target.elements.message.value.length > 0){

            const message = {

                sender: 'doctor',
                text: e.target.elements.message.value,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),

            };
            
            setMessagesData(prevMessages => [...prevMessages, message]);

            e.target.reset();

        }
        else{
            setErrorMessage("Can't send an empty message");
            setTimeout(() => {
                setErrorMessage(null);
            } , 1500)
        }

    };

    const handleKeyPress = (e) => {

        if (e.key === 'Enter' && !e.shiftKey) {

            e.preventDefault();
            e.target.form.requestSubmit();

        }

    };

    const setDisplay = useOutletContext();

    return <React.Fragment>

        <div className={chatCSS.container}>

            <div className={chatCSS.info_box}>

                <div className={chatCSS.main_info}>

                    <div className={chatCSS.m_img}>
                        <img src={require('../../../../Images/user_img.png')} alt="" />
                    </div>

                    <p className={chatCSS.m_p}>Omar Khaled Mohamed</p>

                </div>

                <div onClick={() => setDisplay(true)} className={chatCSS.burger}>
                    <HiUsers />
                </div>

            </div>

            <div className={chatCSS.chat_box}>

                {messagesData.map((msg , idx) => <motion.div
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
                        <p>{msg.text}</p>
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

                <div className={chatCSS.file_upload}>
                    <FaRegImage />
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
