import React, { useState, useEffect } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import '../Admin.css'
import EditModal from "../Modals/EditGitRepo";

function GitRepoLink({ id }) {

    const [prevData, setPrevData] = useState([
        {
            repoName: 'murad',
            repoUrl: 'ejrjewjr53',
            repoDescription: 'dsfsfdsdd'
        }
    ])
    const [gitData, setGitData] = useState({})
    const [oldData, setOldData] = useState({})

    const [edit, setEdit] = useState(false)

    const handleChange = (e) => {
        setGitData({
            ...gitData,
            [e.target.name]: e.target.value
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
        console.log(gitData);
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
                    {prevData.map(item => (
                        <div className="prev-item" key={item?.gitRepolinkId} >
                            <div>{item?.repoName} </div>
                            <div>{item?.repoUrl} </div>
                            <div>{item?.repoDescription} </div>
                            <FontAwesomeIcon icon={faEdit} onClick={() => editLink(item)} />
                        </div>
                    ))}
                </div>
                <div className="inputs">
                    <input id="name" onChange={(e) => handleChange(e)} name="name" />
                    <input id="url" onChange={(e) => handleChange(e)} name="url" />
                    <input id="desc" onChange={(e) => handleChange(e)} name="desc" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>
            {edit && <EditModal data={oldData} setEdit={setEdit} />}
        </>
    )
}

export default GitRepoLink