import React, { useState } from "react";
import '../Admin.css'

function GitRepoLink() {

    const [gitData, setGitData] = useState({})

    const handleChange = (e) => {
        setGitData({
            ...gitData,
            [e.target.name]: e.target.value
        })
    }
    console.log(gitData)


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
                <div className="inputs">
                    <input id="name" onChange={(e) => handleChange(e)} name="name" />
                    <input id="url" onChange={(e) => handleChange(e)} name="url" />
                    <input id="desc" onChange={(e) => handleChange(e)} name="desc" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default GitRepoLink