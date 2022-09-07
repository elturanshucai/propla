import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import '../Admin.css'

function EditGeneralForm({ data, projectId, getData }) {

    const formik = useFormik({
        initialValues: {
            projectFullname: data?.projectFullname,
            projectDescription: data?.projectDescription,
            createdBy: data?.createdBy,
            productionDate: data?.productionDate,
            userCount: data?.userCount,
            projectId: projectId,
            generalInfoId: data?.generalInfoId
        },
        onSubmit: values => {
            axios.put('http://10.1.14.29:81/api/GeneralInfo', formik.values).then(data => {
                if (data.status === 200) {
                    getData()
                }
            }).catch(err => console.log(err))
        }
    })

    return (
        <>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="prjname">Project Full Name</label>
                    <input id="prjname" type="text" name="projectFullname" onChange={formik.handleChange} value={formik.values.projectFullname} />
                    <label htmlFor="desc">Project Description</label>
                    <input id="desc" type="text" name="projectDescription" onChange={formik.handleChange} value={formik.values.projectDescription} />
                    <label htmlFor="create">Created By</label>
                    <input id="create" type="text" name="createdBy" onChange={formik.handleChange} value={formik.values.createdBy} />
                    <label htmlFor="date">Production Date</label>
                    <input id="date" type="date" name="productionDate" onChange={formik.handleChange} value={formik.values.productionDate} />
                    <label htmlFor="count">Project User Count</label>
                    <input id="count" type="number" name="userCount" onChange={formik.handleChange} value={formik.values.userCount} />
                    <button className="btn-new" type="submit">Change</button>
                </form>
        </>
    )
}

export default EditGeneralForm