import { useFormik } from "formik";
import React from "react";
import '../Admin.css'

function EditProjectUsers({ data, setModal, userId, getData }) {

    const formik = useFormik({
        initialValues: {
            mail: data?.mail,
            devtypename: data?.devtypename,
            projectUserDescription: data?.projectUserDescription,
            userId: userId
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <>
            <div className="projectUserModal">
                <form>
                    <label htmlFor="mail">Email</label>
                    <input id="mail" type="email" required onChange={formik.handleChange} />
                    <label htmlFor="devtypename">Dev Type Name</label>
                    <input id="devtypename" type="text" onChange={formik.handleChange} />
                    <label htmlFor="projectUserDescription">Project User Description</label>
                    <input id="projectUserDescription" type="text" onChange={formik.handleChange} />
                    <button className="btn-new" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default EditProjectUsers