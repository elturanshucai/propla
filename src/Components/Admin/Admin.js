import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import AddModal from './AddModal';

function Admin() {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [edit, setEdit]=useState()

    const getProjects = useCallback(() => {
        axios.get(process.env.REACT_APP_PROJECT_URL)
            .then(data => setList(data.data))
    }, [])


    const deleteProject = (id) => {
        console.log(id);
        axios.delete('http://10.1.14.29:81/api/ProjectInfo/' + `${id}`).then(data => console.log(data))
    }

    const editProject = (id) => {
        setEdit(id)
        setModal(true)
    }

    useEffect(() => {
        getProjects()
    }, [getProjects])



    return (
        <>
            <div className='admin'>
                <div className='left'>
                    <h2>Proyektler</h2>
                    <ul className='projectList'>
                        {list.length > 0 ?
                            list.map((item, index) => (
                                <li key={index} > {item?.projectName}
                                    <div><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                            )) :
                            <div>Siyahi bosdur</div>
                        }
                    </ul>
                </div>
                <div className='panel'>
                    <button className='btn-new' onClick={() => setAddModal(true)}> Yeni Proyekt <FontAwesomeIcon icon={faPlus} /> </button>
                </div>
                {modal && <Modal setModal={setModal} id={edit} />}
                {addModal && <AddModal closeModal={setAddModal} />}

            </div>
        </>
    )
}
export default Admin
