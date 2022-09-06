import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function EditGitRepo({ data, setEdit }) {

    const [newData, setNewData] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newData);
        axios.put(`http://10.1.14.29:81/api/GitRepoLink`, newData).then(res => console.log(res))
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="edit-div">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="ip">Repo Name <FontAwesomeIcon icon={faClose} onClick={() => setEdit(false)} size={'2x'} /></label>
                <input id="ip" name="repoName" defaultValue={data?.repoName} onChange={(e) => handleChange(e)} />
                <label htmlFor="port">Repo URL</label>
                <input id="port" name="repoUrl" defaultValue={data?.repoUrl} onChange={(e) => handleChange(e)} />
                <label htmlFor="type">Repo Description</label>
                <input id="type" name="repoDescription" defaultValue={data?.repoDescription} onChange={(e) => handleChange(e)} />
                <button className="btn-new" type="submit" >Change</button>
            </form>
        </div>
    )
}

export default EditGitRepo