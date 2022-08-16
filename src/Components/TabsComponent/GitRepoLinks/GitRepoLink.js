import React from "react";
import './GitRepoLink.css'

function GitRepoLink(){
    return (
        <>
            <ul className="gitlinks">
                <li>
                    <div>Repo Name</div>
                    <div>Repo URL</div>
                    <div>Repo Description</div>
                </li>
            </ul>
        </>
    )
}

export default GitRepoLink