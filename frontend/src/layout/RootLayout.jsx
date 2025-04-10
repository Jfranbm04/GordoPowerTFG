import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
            {/* <div>RootLayout</div> */}
            <main>
                <Outlet />
            </main>

            {/* <footer>
                <p>footer</p>
            </footer> */}
        </>
    )
}

export default RootLayout