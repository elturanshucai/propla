import axios from "axios";
import React, { useState } from "react";
import '../Admin.css'

function EditTech({ data, setEdit, getTech, projectId }) {

    const [tech, setTech] = useState(data)

    const handleChange = (e) => {
        setTech({
            ...tech,
            [e.target.name]: e.target.value,
            projectId: projectId
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://10.1.14.29:81/api/TechStack/`, tech).then(data=>{
            if(data.status===200){
                setEdit(false)
                getTech()
            }
        })
    }

    return (
        <>
            <div className="edit-div">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="tech">Tech Name</label>
                    <input
                        id="tech"
                        name="programName"
                        type="text"
                        defaultValue={data?.programName}
                        onChange={(e) => handleChange(e)}
                    />
                    <button
                        className="btn-new"
                        type="submit"
                    >
                        Change
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditTech