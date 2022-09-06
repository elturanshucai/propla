import React, { useState, useEffect } from "react";
import axios from "axios";

function GitRepoLink() {

    const [gitlink, setGitLink] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get('http://10.1.14.29:81/api/GitRepoLink' + `/${id}`).then(data => setGitLink(data.data))

    }, [])


    return (
        <>
            <table className="table-3" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Repo Name</td>
                        <td>Repo URL</td>
                        <td>Repo Description</td>
                    </tr>
                </thead>
                <tbody>
                    {gitlink.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.repoName}</td>
                            <td>{item?.repoUrl}</td>
                            <td>{item?.repoDescription}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default GitRepoLink