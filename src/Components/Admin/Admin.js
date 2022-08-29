<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';

function Admin() {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)

    const getProjects = useCallback(() => {
        axios.get(process.env.REACT_APP_PROJECT_URL)
            .then(data => setList(data.data))
    }, [])

    useEffect(() => {
        getProjects()
    }, [getProjects])
    return (
        <>
            <div className='admin'>
                <div className='left'>
                    <h2>Projects</h2>
                    <ul className='projectList'>
                        {list.map(item => (
                            <li> {item?.projectName} </li>
                        ))}
                    </ul>
                </div>
                <div className='panel'>
                    <button className='btn-new' onClick={() => setModal(true)}> Yeni Proyekt <FontAwesomeIcon icon={faPlus} /> </button>
                </div>
                {modal && <Modal setModal={setModal} />}

            </div>
        </>
    )
}

=======
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

>>>>>>> 7ca95a059d8bcdc3511ead4f8a5c6fcdf9d98ffd
export default Admin