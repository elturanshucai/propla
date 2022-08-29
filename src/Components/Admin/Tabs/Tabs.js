import React, { useState } from "react";
import './Tabs.css'

function Tabs() {

    const [tabId, setTabId] = useState('info')
    const handleClick = (e) => {
        setTabId(e.target.id)
        let buttons = document.querySelectorAll('.tabs button')
        buttons.forEach(item => item.classList.remove('active'))
        e.target.classList.add('active')
    }

    return (
        <>
            <div className="tabs">
                <div className="tab">
                    <button id="info" onClick={handleClick} className='active'>General Info</button>
                    <button id="serverlink" onClick={handleClick}>Server Links</button>
                    <button id="gitlink" onClick={handleClick}>GitRepo Links</button>
                    <button id="prusers" onClick={handleClick}>Project Users</button>
                    <button id="tchstack" onClick={handleClick}>Tech Stack</button>
                </div>
                <div className="component">
                    {tabId === 'info'}
                </div>
            </div>
        </>
    )
}

export default Tabs