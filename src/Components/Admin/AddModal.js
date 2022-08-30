import axios from "axios";
import React, { useState } from "react";
import './Admin.css'

function AddModal() {

    const [project, setProject] = useState({})

    const handleChange = (e) => {
        setProject({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://10.1.14.29:81/api/ProjectInfo', project)
    }

    return (
        <>
            <div className="modal">
                <form className="addModal" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="projectName">Project Name</label>
                    <input id="projectName" type="text" name="projectName" onChange={(e) => handleChange(e)} />
                    <button className="btn-new" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddModal