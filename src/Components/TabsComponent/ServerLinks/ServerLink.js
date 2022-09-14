import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ServerLink.css'

function ServerLink() {

    const [serverlink, setServerLink] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get(process.env.REACT_APP_SERVERLINK_API + id).then(data => setServerLink(data.data))

    }, [])

    return (
        <>
            <table className='table-3' cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Server IP</td>
                        <td>Server Port</td>
                        <td>Server Type Name</td>
                    </tr>
                </thead>
                <tbody>
                    {serverlink.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.serverIp}</td>
                            <td>{item?.serverPort}</td>
                            <td>{item?.serverTypeName}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default ServerLink