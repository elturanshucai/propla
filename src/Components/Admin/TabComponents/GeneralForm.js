import axios from "axios";
import React, { useState } from "react";
import '../Admin.css'

function GeneralForm({ id }) {

    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        data.projectid=id
        console.log(data);
        // axios.post(`http://10.1.14.29:81/api/GeneralInfo/${id}`, data).then(data=>console.log(data)).catch(err=>console.log(err))
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="prjname">Project Full Name</label>
                <input id="prjname" type="text" name="projectFullname" onChange={(e) => handleChange(e)} />
                <label htmlFor="desc">Project Description</label>
                <input id="desc" type="text" name="projectDescription" onChange={(e) => handleChange(e)} />
                <label htmlFor="create">Created By</label>
                <input id="create" type="text" name="createdBy" onChange={(e) => handleChange(e)} />
                <label htmlFor="date">Production Date</label>
                <input id="date" type="date" name="productionDate" onChange={(e) => handleChange(e)} />
                <label htmlFor="count">Project User Count</label>
                <input id="count" type="number" name="userCount" onChange={(e) => handleChange(e)} />
                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default GeneralForm