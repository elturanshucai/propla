import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Admin.css'
import EditProjectUsers from "../Modals/EditProjectUsers";

function ProjectUsers({ id }) {

    const [users, setUsers] = useState([])
    const [workers, setWorkers] = useState([])
    const [edit, setEdit] = useState(false)
    const [editData, setEditData] = useState()
    const [userId, setUserId] = useState()

    const formik = useFormik({
        initialValues: {
            mail: workers[0]?.mail,
            devtypename: '',
            projectUserDescription: '',
            projectId: id
        },
        onSubmit: values => {
            console.log(values);
            axios.post(process.env.REACT_APP_PROJECTPOSITION_API, values).then(data => {
                if (data.status === 200) {
                    toast.success('Uğurla əlavə edildi');
                    getData()
                    formik.setValues({
                        mail: workers[0]?.mail,
                        devtypename: '',
                        projectUserDescription: '',
                        projectId: id
                    })
                }
            }).catch(err => {
                toast.error('Xəta baş verdi')
                console.log(err)
            })
        }
    })


    const editUser = (id, item) => {
        setEditData(item)
        setEdit(true)
        setUserId(id)
    }

    const deleteUser = (id) => {
        axios.delete(process.env.REACT_APP_PROJECTPOSITION_API + id)
            .then(data => {
                if (data.status === 200) {
                    toast.info('Uğurla silindi')
                    getData()
                }
            })
            .catch(err => {
                toast.error('Xəta baş verdi')
                console.log(err)
            })
    }

    const getData = useCallback(() => {
        axios.get(process.env.REACT_APP_PROJECTPOSITION_API + id).then(data => setUsers(data.data))
    }, [id])

    const getWorkers = useCallback(() => {
        axios.get(process.env.REACT_APP_USER_API).then(data => setWorkers(data.data))
    }, [])

    useEffect(() => {
        getData()
        getWorkers()
    }, [getData, getWorkers])

    return (
        <>
            {edit && <EditProjectUsers setEdit={setEdit} getData={getData} projectpositionid={userId} data={editData} projectId={id} />}
            <div className="editProject">
                {users.map((item, index) => (
                    <div className="editProjectInner" key={index}>
                        <div>{item?.user?.name}</div>
                        <div>{item?.user?.surname}</div>
                        <div>{item?.user?.mail}</div>
                        <div>{item?.devtypename}</div>
                        <div className="icons">
                            <FontAwesomeIcon icon={faUserEdit} onClick={() => editUser(item?.projectpositionid, item)} />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteUser(item?.projectpositionid)} />
                        </div>
                    </div>

                ))}
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="mail">Email</label>
                <select id="mail" onChange={formik.handleChange} value={formik.values.mail} required>
                    <option value=''>Mail</option>
                    {workers.map((item, index) => (
                        <option key={index} value={item?.mail}>{item?.mail}</option>
                    ))}
                </select>
                <label htmlFor="devtypename">Dev Type Name</label>
                <input id="devtypename" type="text" required onChange={formik.handleChange} value={formik.values.devtypename} />
                <label htmlFor="projectUserDescription">Project User Description</label>
                <input id="projectUserDescription" type="text" onChange={formik.handleChange} value={formik.values.projectUserDescription} />
                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default ProjectUsers