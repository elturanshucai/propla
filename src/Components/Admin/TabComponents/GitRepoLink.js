import React, { useState, useEffect } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import '../Admin.css'
import EditModal from "../Modals/EditGitRepo";

function GitRepoLink({ id }) {

    const [prevData, setPrevData] = useState([])
    const [gitData, setGitData] = useState({})
    const [oldData, setOldData] = useState({})

    const [edit, setEdit] = useState(false)

    const handleChange = (e) => {
        setGitData({
            ...gitData,
            [e.target.name]: e.target.value,
            projectId: id
        })
    }

    const editLink = (data) => {
        setEdit(true)
        setOldData(data)
    }

    const getData = () => {
        axios.get(`http://10.1.14.29:81/api/GitRepoLink/${id}`).then(data => setPrevData(data.data))
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://10.1.14.29:81/api/GitRepoLink`, gitData).then(res => console.log(res))
    }

    const deleteLink = (linkId) => {
        axios.delete(`http://10.1.14.29:81/api/GitRepoLink/${linkId}`).catch(err => console.log(err))
    }

    return (
        <>
            <form className="link" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-title">
                    <label htmlFor="name">Repo Name</label>
                    <label htmlFor="url">Repo URL</label>
                    <label htmlFor="desc">Repo Description</label>
                </div>
                <div className="prevLinks">
                    {prevData.length > 0 && prevData.map(item => (
                        <div className="prev-item" key={item?.gitRepolinkId} >
                            <div>{item?.repoName} </div>
                            <div>{item?.repoUrl} </div>
                            <div>{item?.repoDescription} </div>
                            <div className="icons">
                                <FontAwesomeIcon icon={faEdit} onClick={() => editLink(item)} />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteLink(item.gitRepolinkId)} />
                            </div>
                            
                        </div>
                    ))}
                </div>
                <div className="inputs">
                    <input id="name" onChange={(e) => handleChange(e)} name="repoName" />
                    <input id="url" onChange={(e) => handleChange(e)} name="repoUrl" />
                    <input id="desc" onChange={(e) => handleChange(e)} name="repoDescription" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>
            {edit && <EditModal data={oldData} setEdit={setEdit} />}
        </>
    )
}

export default GitRepoLink