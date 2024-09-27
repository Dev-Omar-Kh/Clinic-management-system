import React from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import searchCSS from './header.module.css';

export default function Search() {

    return <React.Fragment>

        <form className={searchCSS.form}>

            <input type="text" placeholder={`Search for doctor`}/>

            <button type='submit'><SearchOutlinedIcon /></button>

        </form>

    </React.Fragment>

}