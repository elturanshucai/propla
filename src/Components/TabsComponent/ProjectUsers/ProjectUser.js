import React, { useState, useEffect } from "react";
import axios from "axios";
import './Project.css'

function ProjectUser() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get(process.env.REACT_APP_PROJECTPOSITION_API + id).then(data => setUsers(data.data))
    }, [])

    return (
        <>
            <table className="projectusers" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Surname</td>
                        <td id="mail">Mail</td>
                        <td>Office Number</td>
                        <td>Personal Number</td>
                        <td>Position Name</td>
                        <td>Dev Type Name</td>
                        <td>Project User Description</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user?.user?.name}</td>
                            <td>{user?.user?.surname}</td>
                            <td>{user?.user?.mail}</td>
                            <td>{user?.user?.officeNumber}</td>
                            <td>{user?.user?.personalNumber}</td>
                            <td>{user?.user?.positionName}</td>
                            <td>{user?.devtypename}</td>
                            <td>{user?.projectUserDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProjectUser