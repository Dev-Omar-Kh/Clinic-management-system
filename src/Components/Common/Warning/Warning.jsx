import React from 'react';

import { PiSealWarning } from 'react-icons/pi';

import warnCSS from './warning.module.css';
import { motion } from 'framer-motion';

export default function Warning({cancel , data , deleteData}) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible: {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren'}},
        exit : {opacity : 0 , transition : {duration : 0.3}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y : 20 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' exit={'exit'} className={warnCSS.container}>

            <motion.div variants={childVariants} className={warnCSS.warn_msg}>

                <div className={warnCSS.title}>
                    <PiSealWarning className={warnCSS.title_icon} />
                    <p>Warning</p>
                </div>

                <div className={warnCSS.msg_text}>

                    <p>Are you sure you want to delete " <span>D. {data.name}</span> " ?</p>

                </div>

                <div className={warnCSS.actions}>

                    <motion.button 
                        onClick={() => deleteData(data.id)}
                        whileTap={{scale : 0.85}} className={warnCSS.delete}
                    >Delete</motion.button>
                    <motion.button 
                        onClick={() => cancel(false)}
                        whileTap={{scale : 0.85}} className={warnCSS.cancel}
                    >Cancel</motion.button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
