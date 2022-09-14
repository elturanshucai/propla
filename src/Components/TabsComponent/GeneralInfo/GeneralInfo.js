import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./General.css"

function GeneralInfo() {

    const [generalInfo, setGeneralInfo] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get(process.env.REACT_APP_GENERALINFO_API + id).then(data => setGeneralInfo(data.data))

    }, [])

    return (
        <>
            <table className='general-info'>
                <thead>
                    <tr>
                        <td>Project Full Name</td>
                        <td>Project Description</td>
                        <td>Created By</td>
                        <td>Production Date</td>
                        <td>Project User Count</td>
                    </tr>
                </thead>
                <tbody>
                    {generalInfo.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.projectFullname}</td>
                            <td>{item?.projectDescription}</td>
                            <td>{item?.createdBy}</td>
                            <td>{item?.productionDate}</td>
                            <td>{item?.userCount}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default GeneralInfo