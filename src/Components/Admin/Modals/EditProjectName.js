import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import '../Admin.css'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditName({ getData, data, setModal }) {

    const formik = useFormik({
        initialValues: {
            projectId: data?.projectId,
            projectName: data?.projectName,
            projectLogo: data?.projectLogo
        },
        onSubmit: values => {
            axios.put(process.env.REACT_APP_PROJECTINFO_API, values).then(data => {
                if (data.status === 200) {
                    toast.success('Ad dəyişdirildi', {
                        theme: "colored"
                    })
                    getData()
                    setModal(false)
                }
            }).catch(err => {
                toast.error('Xəta baş verdi', {
                    theme: 'colored'
                })
                console.log(err)
            })
        }
    })

    return (
        <>
            <div className="edit-div-modal">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Edit Project Name</h2>
                    <label htmlFor="projectName">Project Name</label>
                    <input id="projectName" required value={formik.values.projectName} onChange={formik.handleChange} />
                    <div className="form-foot">
                        <div>
                            <button className="btn-new" type="submit">Change</button>
                            <button className="close-btn" type="button" onClick={() => setModal(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditName