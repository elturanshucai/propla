import { faArrowLeft, faCircleInfo, faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Admin.css'
import AddModalUser from "./Modals/AddUserModal";
import EditUser from "./Modals/EditUser";

function Users({ display }) {

    const [users, setUsers] = useState([
        {
            id: '1',
            name: 'Elturan',
            surname: 'Sucai',
            mail: 'fcb@gmal.com'
        }
    ])
    const [searchList, setSearchList] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editId, setEditId] = useState()
    const [editData, setEditData] = useState()

    const getUsers = () => {
        axios.get(`http://10.1.14.29:81/api/User`).then(data => setUsers(data.data)).catch(err => console.log(err))
    }

    const search = (input) => {
        let newList = []
        newList = users.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        setSearchList(newList)
    }

    const deleteUser = (id) => {
        axios.delete(`http://10.1.14.29:81/api/User/${id}`)
            .then(data => {
                if (data.status === 200) {
                    getUsers()
                }
            })
            .catch(err => console.log(err))
    }

    const editUser = (id, data) => {
        setEditModal(true)
        setEditData(data)
        setEditId(id)
    }

    useEffect(() => {
        // getUsers()
    }, [])

    return (
        <>{modal && <AddModalUser setModal={setModal} getData={getUsers} />}
            {editModal && <EditUser setModal={setEditModal} data={editData} id={editId} getData={getUsers} />}
            <div className="modal users">
                <div className="left-head user-head">
                    <FontAwesomeIcon icon={faArrowLeft} size='lg' onClick={() => display(false)} />

                    <h2>Istifadeciler</h2>
                    <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    <button className="btn-new" onClick={() => setModal(true)}>Yeni Istifadeci</button>
                </div>
                <ul className='projectList'>
                    {
                        searchList.length > 0 ?
                            searchList.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div><FontAwesomeIcon id={item?.userId} icon={faEdit} size={'lg'} className="edit" onClick={() => editUser(item?.userId, item)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteUser(item?.userId)} /></div> </li>
                            )) :
                            users.map((item, index) => (
                                <li key={index} >
                                    <div>{item?.name}</div>
                                    <div>{item?.surname}</div>
                                    <div>{item?.mail}</div>
                                    <div><FontAwesomeIcon id={item?.userId} icon={faEdit} size={'lg'} className="edit" onClick={() => editUser(item?.userId, item)} /> <FontAwesomeIcon icon={faTrash} size={'lg'} onClick={() => deleteUser(item?.userId)} /></div> </li>
                            ))
                    }
                    {/* {
                        users.length === 0 &&
                        <div className='notProject'>
                            <FontAwesomeIcon color='#09347a' size='4x' icon={faCircleInfo} />
                            <h2>Proyekt yoxdur</h2>
                        </div>
                    } */}
                </ul>
            </div>
        </>
    )
}

export default Users