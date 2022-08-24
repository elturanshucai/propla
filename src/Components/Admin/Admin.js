import React, { useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css'

function Admin() {

    const [display, setDisplay] = useState(false)
    const [projects, setProjects] = useState([])

    return (
        <>
            <div className='admin'>
                <div className='admin-head'>
                    <button className='add'> <FontAwesomeIcon icon={faPlus} /> </button>
                </div>
            </div>
        </>
    )
}

export default Admin