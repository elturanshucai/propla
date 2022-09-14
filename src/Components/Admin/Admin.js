import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { faArrowCircleRight, faPlus, faTrash, faHome, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo, faPen } from "@fortawesome/free-solid-svg-icons";
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modals/Modal';
import AddModal from './Modals/AddModal';
import Loading from '../UI/Loading'
import Users from './Users';
import EditName from './Modals/EditProjectName';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Admin() {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [userComp, setUserComp] = useState(false)
    const [edit, setEdit] = useState()
    const [editData, setEditData] = useState()
    const [nameModal, setNameModal] = useState(false)

    const [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(false)

    const getProjects = useCallback(async () => {
        try {
            setLoading(true)
            const res = axios.get(process.env.REACT_APP_PROJECTINFO_API)
            setList((await res).data)
            if ((await res).status) {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }, [])

    const search = (input) => {
        let newList = []
        newList = list.filter(item => item.projectName.toLowerCase().includes(input.toLowerCase()))
        setList(newList)
        if(input.trim()===''){
            getProjects()
        }
    }


    const deleteProject = (id) => {
        axios.delete(`${process.env.REACT_APP_PROJECTINFO_API}${id}`)
            .then(data => {
                if (data.status === 200) {
                    toast.info('Proyekt silindi', {
                        theme: "colored"
                    })
                    getProjects()
                }
            })
            .catch(err => {
                toast.error('Xəta baş verdi', {
                    theme: 'colored'
                })
                console.log(err)
            })
    }

    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const editProject = (id) => {
        setEdit(id)
        setModal(true)
    }

    const editProjectName = (data) => {
        setNameModal(true)
        setEditData(data)
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
                        <h2>Proyektlər</h2>
                        <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    </div>

                    <ul className='projectList'>
                        {/* {
                            searchList.length > 0 ?
                                searchList.map((item, index) => (
                                    <li key={index} >
                                        <div>
                                            <FontAwesomeIcon icon={faPen} onClick={() => editProjectName(item)} />
                                            {item?.projectName}
                                        </div>

                                        <div className='edit-delete'><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                                )) :
                                list.map((item, index) => (
                                    <li key={index} >
                                        <div>
                                            <FontAwesomeIcon icon={faPen} onClick={() => editProjectName(item)} />
                                            {item?.projectName}
                                        </div>
                                        <div className='edit-delete'><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                                ))
                        } */}
                        {
                            list.map((item, index) => (
                                <li key={index} >
                                    <div>
                                        <FontAwesomeIcon icon={faPen} onClick={() => editProjectName(item)} />
                                        {item?.projectName}
                                    </div>
                                    <div className='edit-delete'><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                            ))
                        }
                        {
                            list.length === 0 &&
                            <div className='notProject'>
                                <FontAwesomeIcon color='#09347a' size='4x' icon={faCircleInfo} />
                                <h2>Proyekt yoxdur</h2>
                            </div>
                        }
                    </ul>
                </div>
                <div className='panel'>
                    <button className='btn-new panel-btn' onClick={() => setAddModal(true)}> Yeni Proyekt <FontAwesomeIcon icon={faPlus} size='xs' /> </button>
                    <button className='btn-new panel-btn' onClick={() => setUserComp(true)}> İstifadəçilər <FontAwesomeIcon icon={faArrowCircleRight} size='xs' /> </button>
                    <button className='btn-new panel-btn' onClick={goHome}>Ana Səhifə <FontAwesomeIcon icon={faHome} size='xs' /> </button>
                    <button className='btn-new close-btn' onClick={logOut}>Çıxış <FontAwesomeIcon icon={faSignOut} size='xs' /> </button>
                </div>
                {modal && <Modal setModal={setModal} id={edit} />}
                {addModal && <AddModal closeModal={setAddModal} getProjects={getProjects} />}
                {userComp && <Users display={setUserComp} />}
                {nameModal && <EditName getData={getProjects} data={editData} setModal={setNameModal} />}
            </div>
        </>
    )
}
export default Admin
