import React, { useState, useEffect } from "react";
import axios from "axios";
import './Project.css'

function ProjectUser() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get(`http://10.1.14.29:81/api/User/${id}`).then(data => setUsers(data.data))
    }, [])
    console.log(users);

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
                    {users.map(user => (
                        <tr>
                            <td>{user?.name}</td>
                            <td>{user?.surname}</td>
                            <td>{user?.mail}</td>
                            <td>{user?.officeNumber}</td>
                            <td>{user?.personalNumber}</td>
                            <td>{user?.positionName}</td>
                            <td>Bilmirem</td>
                            <td>Aciqlama yoxdur</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProjectUser