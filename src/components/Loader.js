import React from 'react'
import preloader from '../img/preloader.gif'

function Loader() {
    const preloaderStyle = {
        backgroundImage: `url(${preloader})`,
        height: '100vh',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'36%'
    }

    return (
        <div style={{ background: 'white' }}>
            <div className='preloader' style={preloaderStyle}>
            </div>
        </div>

    )
}

export default Loader
