import React, { useState } from "react";
import '../Admin.css'

function ServerLink() {

    const [serverData, setServerData] = useState([])

    const handleChange = (e) => {
        setServerData({
            ...serverData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(serverData);
    }

    return (
        <>
            <form className="link" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-title">
                    <label htmlFor="ip">Server IP</label>
                    <label htmlFor="port">Server Port</label>
                    <label htmlFor="type">Server Type</label>
                </div>
                <div className="inputs">
                    <input id="ip" onChange={(e) => handleChange(e)} name="ip" />
                    <input id="port" onChange={(e) => handleChange(e)} name="port" />
                    <input id="type" onChange={(e) => handleChange(e)} name="type" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default ServerLink