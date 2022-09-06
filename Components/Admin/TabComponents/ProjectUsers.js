import React, { useState } from "react";
import '../Admin.css'

function ProjectUsers({ id }) {

    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
            projectId: id
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(e) => handleChange(e)} />
                <label htmlFor="dev-type-name">Dev Type Name</label>
                <input id="dev-type-name" type="text" onChange={(e) => handleChange(e)} />
                <label htmlFor="user-desc">Project User Description</label>
                <input id="user-desc" type="text" onChange={(e) => handleChange(e)} />
                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default ProjectUsers