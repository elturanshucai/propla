import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Admin.css'

function EditProjectUsers({ data, setEdit, projectpositionid, getData, projectId }) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_USER_API).then(data => setUsers(data.data)).catch(err => console.log(err))
    }, [])

    const formik = useFormik({
        initialValues: {
            mail: data?.user?.mail,
            devtypename: data?.devtypename,
            projectUserDescription: data?.projectUserDescription,
            projectpositionid: projectpositionid,
            projectId: projectId
        },
        onSubmit: values => {
            axios.put(process.env.REACT_APP_PROJECTPOSITION_API, values).then(data => {
                if (data.status === 200) {
                    toast.info('Məlumatlar dəyişdirildi', {
                        theme: "colored"
                    })
                    getData()
                    setEdit(false)
                }
            }).catch(err => {
                toast.error('Xəta baş verdi', {
                    theme: "colored"
                })
                console.log(err)
            })
        }
    })

    return (
        <>
            <div className="edit-div-modal">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Edit Project User</h2>
                    <label htmlFor="mail">Email</label>
                    <select id="mail" onChange={formik.handleChange} value={formik.values.mail}>
                        {users.map((item, index) => (
                            <option key={index} value={item?.mail} >{item?.mail}</option>
                        ))}
                    </select>
                    <label htmlFor="devtypename">Dev Type Name</label>
                    <input id="devtypename" type="text" required onChange={formik.handleChange} value={formik.values.devtypename} />
                    <label htmlFor="projectUserDescription">Project User Description</label>
                    <input id="projectUserDescription" type="text" onChange={formik.handleChange} value={formik.values.projectUserDescription} />
                    <div className="form-foot">
                        <div>
                            <button className="btn-new" type="submit">Change</button>
                            <button type="button" onClick={() => setEdit(false)} className="close-btn">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProjectUsers