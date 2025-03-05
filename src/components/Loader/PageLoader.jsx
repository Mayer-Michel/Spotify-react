import React from 'react'
import { RingLoader } from 'react-spinners'

const PageLoader = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-black'>
            <RingLoader
                size={100}
                color='rgba(30,215,96,1)'
            />
        </div>
    )
}

export default PageLoader