import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditServerLink({ data, setEdit }) {

    const [newData, setNewData] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newData);
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="edit-div">
            <form onSubmit={(e) => handleSubmit(e)}>
                <FontAwesomeIcon icon={faClose} onClick={() => setEdit(false)} size={'2x'} />
                <label htmlFor="ip">Server IP</label>
                <input id="ip" name="serverIp" defaultValue={data?.serverIp} onChange={(e) => handleChange(e)} />
                <label htmlFor="port">Server Port</label>
                <input id="port" name="serverPort" defaultValue={data?.serverPort} onChange={(e) => handleChange(e)} />
                <label htmlFor="type">Server Type</label>
                <input id="type" name="serverTypeName" defaultValue={data?.serverTypeName} onChange={(e) => handleChange(e)} />
                <button className="btn-new" type="submit" >Change</button>
            </form>
        </div>
    )
}

export default EditServerLink