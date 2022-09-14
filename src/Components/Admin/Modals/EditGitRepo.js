import React, { useState } from "react";
import '../Admin.css'
import axios from "axios";
import { toast } from "react-toastify";

function EditGitRepo({ data, setEdit, getData }) {

    const [newData, setNewData] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(process.env.REACT_APP_GITREPOLINK_API, newData).then(data => {
            if (data.status === 200) {
                toast.info('Məlumatlar dəyişdirildi', {
                    theme: "colored"
                })
                setEdit(false)
                getData()
            }
        }).catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="edit-div-modal">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Edit Git Repo Link</h2>
                <label htmlFor="ip">Repo Name</label>
                <input id="ip" name="repoName" defaultValue={data?.repoName} onChange={(e) => handleChange(e)} />
                <label htmlFor="port">Repo URL</label>
                <input id="port" name="repoUrl" defaultValue={data?.repoUrl} onChange={(e) => handleChange(e)} />
                <label htmlFor="type">Repo Description</label>
                <input id="type" name="repoDescription" defaultValue={data?.repoDescription} onChange={(e) => handleChange(e)} />
                <div className="form-foot">
                    <div>
                        <button className="btn-new" type="submit" >Change</button>
                        <button className="close-btn" type="button" onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditGitRepo