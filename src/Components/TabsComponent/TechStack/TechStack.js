import React, { useState, useEffect } from "react";
import axios from "axios";
import './TechStack.css'

function TechStack() {

    const [tech, setTech] = useState([])

    useEffect(() => {
        let link = window.location.href.split('/')
        let id = link[link.length - 1]
        axios.get(process.env.REACT_APP_TECHSTACK_API + id).then(data => setTech(data.data))
    }, [])

    return (
        <>
            <table className="tech" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    {tech.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.programName}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}
export default TechStack