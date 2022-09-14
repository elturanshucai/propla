import { faArrowLeft, faCircleInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Admin.css'
import AddModalUser from "./Modals/AddUserModal";
import EditUser from "./Modals/EditUser";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Users({ display }) {

    const [users, setUsers] = useState([])
    const [searchList, setSearchList] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editId, setEditId] = useState()
    const [editData, setEditData] = useState()

    const getUsers = () => {
        axios.get(process.env.REACT_APP_USER_API).then(data => setUsers(data.data)).catch(err => console.log(err))
    }

    const search = (input) => {
        let newList = []
        newList = users.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        setSearchList(newList)
    }

    const deleteUser = (id) => {
        axios.delete(process.env.REACT_APP_USER_API + id)
            .then(data => {
                if (data.status === 200) {
                    toast.info('İstifadəçi silindi', {
                        theme: "colored"
                    })
                    getUsers()
                }
            })
            .catch(err => {
                toast.error('Xəta baş verdi', {
                    theme: 'colored'
                })
                console.log(err)
            })
    }

    const editUser = (id, data) => {
        setEditModal(true)
        setEditData(data)
        setEditId(id)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>{modal && <AddModalUser setModal={setModal} getData={getUsers} />}
            {editModal && <EditUser setModal={setEditModal} data={editData} id={editId} getData={getUsers} />}
            <div className="modal users">
                <div className="left-head user-head">
                    <div onClick={() => display(false)}><FontAwesomeIcon icon={faArrowLeft} size='lg' /></div>
                    <h2>İstifadəçilər</h2>
                    <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    <button className="btn-new" onClick={() => setModal(true)}>Yeni İstifadəçi</button>
                </div>
                <ul className='projectList'>
                    {
                        searchList.length > 0 ?
                            searchList.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div className='edit-delete'><FontAwesomeIcon id={item?.userId} icon={faEdit} size={'lg'} className="edit" onClick={() => editUser(item?.userId, item)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteUser(item?.userId)} /></div> </li>
                            )) :
                            users.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div className='edit-delete'><FontAwesomeIcon id={item?.userId} icon={faEdit} size={'lg'} className="edit" onClick={() => editUser(item?.userId, item)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteUser(item?.userId)} /></div> </li>
                            ))
                    }
                    {
                        users.length === 0 &&
                        <div className='notProject'>
                            <FontAwesomeIcon color='#09347a' size='4x' icon={faCircleInfo} />
                            <h2>İstifadəçi yoxdur</h2>
                        </div>
                    }
                </ul>
            </div>
        </>
    )
}

export default Users