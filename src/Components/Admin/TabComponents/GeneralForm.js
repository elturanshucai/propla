import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import '../Admin.css'
import EditGeneralForm from "../Modals/EditGeneralForm";

function GeneralForm({ id }) {

    const [data, setData] = useState([])

    const formik = useFormik({
        initialValues: {
            projectId: id
        },

        onSubmit: async values => {

            axios.post('http://10.1.14.29:81/api/GeneralInfo', formik.values).then(data => {
                if (data.status === 200) {
                    getData()
                }
            }).catch(err => console.log(err))

        },
    })

    const getData = async () => {

        axios.get(`http://10.1.14.29:81/api/GeneralInfo/${id}`).then(data => {
            const { projectFullname, projectDescription, createdBy, productionDate, userCount, generalInfoId } = data.data[0];
            formik.setValues({
                ...formik.values,
                projectFullname,
                projectDescription,
                createdBy,
                productionDate,
                userCount,
                generalInfoId
            });
            setData(data.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>

            {
                data.length > 0 ?
                    <EditGeneralForm data={data[0]} getData={getData} projectId={id} /> :
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="prjname">Project Full Name</label>
                        <input id="prjname" type="text" name="projectFullname" required onChange={formik.handleChange} value={formik.values.projectFullname} />
                        <label htmlFor="desc">Project Description</label>
                        <input id="desc" type="text" name="projectDescription" onChange={formik.handleChange} value={formik.values.projectDescription} />
                        <label htmlFor="create">Created By</label>
                        <input id="create" type="text" name="createdBy" onChange={formik.handleChange} value={formik.values.createdBy} />
                        <label htmlFor="date">Production Date</label>
                        <input id="date" type="date" name="productionDate" onChange={formik.handleChange} value={formik.values.productionDate} />
                        <label htmlFor="count">Project User Count</label>
                        <input id="count" type="number" name="userCount" onChange={formik.handleChange} value={formik.values.userCount} />
                        <button className="btn-new" type="submit">Submit</button>
                    </form>
            }

        </>
    )
}

export default GeneralForm