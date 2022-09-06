import axios from "axios";
import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Admin.css'

function AddModal({ closeModal, getProjects }) {

    const [project, setProject] = useState({})

    const handleChange = (e) => {
        setProject({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://10.1.14.29:81/api/ProjectInfo', project).then(data=>{
            if(data.status===200){
                getProjects()
                closeModal(false)
            }
        })
    }

    return (
        <>
            <div className="modal">
                <FontAwesomeIcon icon={faClose} className="cls-btn" size="2x" color="white" onClick={() => closeModal(false)} />
                <form className="addModal" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="projectName">Project Name</label>
                    <input id="projectName" type="text" name="projectName" onChange={(e) => handleChange(e)} required />
                    <button className="btn-new" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddModal