import React from 'react'
import './ServerLink.css'

function ServerLink(){
    return (
        <>
            <ul className="serverlink">
                <li>
                    <div>Server IP</div>
                    <div>Server Port</div>
                    <div>Server Type Name</div>
                </li>
            </ul>
        </>
    )
}

export default ServerLink