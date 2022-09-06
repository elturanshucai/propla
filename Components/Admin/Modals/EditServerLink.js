import React, { useState } from "react";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditServerLink({ data, setEdit, getData }) {

    const [newData, setNewData] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://10.1.14.29:81/api/ServerLink`, newData).then(data => {
            if (data.status === 200) {
                setEdit(false)
                getData()
            }
        }).catch(err => console.log(err))
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
                <label htmlFor="ip">Server IP <FontAwesomeIcon icon={faClose} onClick={() => setEdit(false)} size={'2x'} /></label>
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