import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../Admin.css'

function ProjectUsers({ id }) {

    const [data, setData] = useState({
        mail: '',
        devtypename: '',
        projectId: id,
        projectUserDescription: ''
    })

    const [users, setUsers] = useState([
        {
            mail: 'elturn',
            devtypename: 'front end',
        },
        {
            mail: 'elturn',
            devtypename: 'front end',
        },
        {
            mail: 'elturn',
            devtypename: 'front end',
        },
    ])
    const [edit, setEdit] = useState(false)
    const [editData, setEditData] = useState()
    const [userId, setUserId] = useState()


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        })
    }

    const editUser = (id, item) => {
        setEditData(item)
        setEdit(true)
        setUserId(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://10.1.14.29:81/api/ProjectPosition/`, data).catch(err => console.log(err))
    }

    const getData = () => {
        axios.get(`http://10.1.14.29:81/api/ProjectPosition/${id}`).then(data => setUsers(data.data))
    }

    useEffect(() => {
        // getData()
    }, [])

    return (
        <>
            <div className="editProject">
                {users.map(item => (
                    <div className="editProjectInner">
                        <div>{item?.mail}</div>
                        <div>{item?.devtypename}</div>
                        <div className="icons">
                            <FontAwesomeIcon icon={faUserEdit} onClick={()=>editUser(item?.userId, item)} />
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>

                ))}
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="mail">Email</label>
                <input id="mail" type="email" required onChange={(e) => handleChange(e)} />
                <label htmlFor="devtypename">Dev Type Name</label>
                <input id="devtypename" type="text" onChange={(e) => handleChange(e)} />
                <label htmlFor="projectUserDescription">Project User Description</label>
                <input id="projectUserDescription" type="text" onChange={(e) => handleChange(e)} />
                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default ProjectUsers