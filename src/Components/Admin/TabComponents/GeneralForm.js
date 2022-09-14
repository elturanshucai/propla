import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Admin.css'
import EditGeneralForm from "../Modals/EditGeneralForm";

function GeneralForm({ id }) {

    const [data, setData] = useState([])

    const formik = useFormik({
        initialValues: {
            projectFullname: data[0]?.projectFullname,
            productionDate: data[0]?.productionDate,
            createdBy: data[0]?.createdBy,
            userCount: data[0]?.createdBy,
            projectId: id,
            generalInfoId: data[0]?.generalInfoId
        },

        onSubmit: async values => {
            axios.post(process.env.REACT_APP_GENERALINFO_API, formik.values).then(data => {
                if (data.status === 200) {
                    toast.success('Uğurla əlavə edildi');
                    getData()
                }
            }).catch(err => {
                toast.error('Xəta baş verdi')
                console.log(err)
            })

        },
    })

    const getData = useCallback(async () => {

        axios.get(process.env.REACT_APP_GENERALINFO_API + id).then(data => {
            setData(data.data)
        }).catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

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
                        <input id="create" type="text" name="createdBy" required onChange={formik.handleChange} value={formik.values.createdBy} />
                        <label htmlFor="date">Production Date</label>
                        <input id="date" type="date" name="productionDate" onChange={formik.handleChange} value={formik.values.productionDate} />
                        <label htmlFor="count">Project User Count</label>
                        <input id="count" type="number" name="userCount" required onChange={formik.handleChange} value={formik.values.userCount} />
                        <button className="btn-new" type="submit">Submit</button>
                    </form>
            }

        </>
    )
}

export default GeneralForm