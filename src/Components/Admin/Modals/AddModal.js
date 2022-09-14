import axios from "axios";
import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
        axios.post(process.env.REACT_APP_PROJECTINFO_API, project).then(data => {
            if (data.status === 200) {
                toast.success('Uğurla əlavə edildi', {
                    theme: "colored"
                })
                getProjects()
                closeModal(false)
            }
        }).catch(err => {
            toast.error('Xəta baş verdi', {
                theme: 'colored'
            })
            console.log(err)
        })
    }

    return (
        <>
            <div className="modal addProject">
                
                <form className="addModal" onSubmit={(e) => handleSubmit(e)}>
                    <div><FontAwesomeIcon icon={faClose} size="2x" color="white" onClick={() => closeModal(false)} /></div>
                    <label htmlFor="projectName">Project Name</label>
                    <input id="projectName" type="text" name="projectName" onChange={(e) => handleChange(e)} required />
                    <button className="btn-new" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddModal