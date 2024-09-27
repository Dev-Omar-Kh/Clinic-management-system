import React from 'react'
import { LuHeartHandshake } from 'react-icons/lu'

export default function Home({height , message , color}) {

    // ====== style ====== //

    const container = {

        width: '100%',
        height: height === 'percent' ? '100%' : '100svh',
        padding: '50px 4.5%',
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center'

    }

    const icon = {

        fontSize: '150px',
        color: color === 'white' ? 'var(--secondary-color)' : 'var(--accent-color-1)'

    }

    const h1 = {

        fontSize: '30px',
        fontWeight: '500',
        color: 'var(--text-color-1)'

    }

    return <React.Fragment>

        <div style={container}>

            <LuHeartHandshake style={icon} />
            <h1 style={h1}>Hello {message ? message : 'User'}</h1>

        </div>

    </React.Fragment>

}
