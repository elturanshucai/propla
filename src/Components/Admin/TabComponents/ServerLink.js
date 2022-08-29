import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ServerLink() {

    const [serverData, setServerData] = useState([])
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    console.log(data)

    const handleClick = () => {
        setServerData(prev => (
            [...prev, { id: serverData.length + 1, value: {} }]
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(serverData);
    }

    return (
        <>
            <form className="serverlink" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-title">
                    <label htmlFor="ip">Server IP</label>
                    <label htmlFor="port">Server Port</label>
                    <label htmlFor="type">Server Type</label>
                    <button className="btn-new add" onClick={handleClick} type="button"> <FontAwesomeIcon icon={faPlus} /> </button>
                </div>
                {serverData.map(item => (
                    <div className="inputs" key={item.id}>
                        <input id="ip" onChange={(e) => handleChange(e)} name="ip" />
                        <input id="port" onChange={(e) => handleChange(e)} name="port" />
                        <input id="type" onChange={(e) => handleChange(e)} name="type" />
                    </div>
                ))}

                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default ServerLink