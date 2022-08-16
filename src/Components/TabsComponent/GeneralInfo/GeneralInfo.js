import React from 'react'
import "./General.css"

function GeneralInfo(){
    return (
        <>
            <ul className="general-info">
                <li>
                    <div>Project Full Name</div>
                    <div></div>
                </li>
                <li>
                    <div>Project Description</div>
                    <div></div>
                </li>
                <li>
                    <div>Created By</div>
                    <div></div>
                </li>
                <li>
                    <div>Production Date</div>
                    <div></div>
                </li>
                <li>
                    <div>Project User Count</div>
                    <div></div>
                </li>
            </ul>
        </>
    )
}

export default GeneralInfo