import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modals/Modal';
import AddModal from './Modals/AddModal';
import Loading from '../UI/Loading'

function Admin() {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [edit, setEdit] = useState()

    const [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(false)

    const getProjects = useCallback(async() => {
        try {
            setLoading(true)
            const res = axios.get('http://10.1.14.29:81/api/ProjectInfo')
            setList((await res).data)
            if((await res).status){
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }, [])

    const search = (input) => {
        let newList = []
        newList = list.filter(item => item.projectName.toLowerCase().includes(input))
        setSearchList(newList)
    }


    const deleteProject = (id) => {
        console.log(id);
        axios.delete(`http://10.1.14.29:81/api/ProjectInfo/${id}`).then(data => console.log(data))
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
            {loading && <Loading />}
                <div className='left'>
                    <div className="left-head">
                        <h2>Proyektler</h2>
                        <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    </div>

                    <ul className='projectList'>
                        {
                            searchList.length > 0 ?
                                searchList.map((item, index) => (
                                    <li key={index} > {item?.projectName}
                                        <div><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                                )) :
                                list.map((item, index) => (
                                    <li key={index} > {item?.projectName}
                                        <div><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                                ))
                        }
                        {
                            list.length === 0 && <div>Proyekt yoxdur</div>
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
