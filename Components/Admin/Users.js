import { faCircleInfo, faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Admin.css'
import AddModalUser from "./Modals/AddUserModal";

function Users({ display }) {

    const [users, setUsers] = useState([])
    const [searchList, setSearchList] = useState([])
    const [modal, setModal] = useState(false)

    const getUsers = () => {
        axios.get(`http://10.1.14.29:81/api/User`).then(data => setUsers(data.data)).catch(err => console.log(err))
    }

    const search = (input) => {
        let newList = []
        newList = users.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        setSearchList(newList)
    }

    const deleteProject = (id) => {
        axios.delete(`http://10.1.14.29:81/api/User/${id}`)
            .then(data => {
                if (data.status === 200) {
                    // getProjects()
                }
            })
            .catch(err => console.log(err))
    }

    const editProject = (id) => {
        // setEdit(id)
        // setModal(true)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>{modal && <AddModalUser />}
            <div className="modal users">
                <div className="left-head user-head">
                    <h2>Istifadeciler</h2>
                    <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    <FontAwesomeIcon icon={faClose} size='2x' onClick={() => display(false)} />
                    <button className="btn-new" onClick={() => setModal(!modal)}>Yeni Istifadeci</button>
                    
                </div>
                <ul className='projectList'>
                    {
                        searchList.length > 0 ?
                            searchList.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                            )) :
                            users.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div><FontAwesomeIcon id={item?.projectId} icon={faEdit} size={'lg'} className="edit" onClick={() => editProject(item?.projectId)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteProject(item?.projectId)} /></div> </li>
                            ))
                    }
                    {
                        users.length === 0 &&
                        <div className='notProject'>
                            <FontAwesomeIcon color='#09347a' size='4x' icon={faCircleInfo} />
                            <h2>Proyekt yoxdur</h2>
                        </div>
                    }
                </ul>
            </div>
        </>
    )
}

export default Users