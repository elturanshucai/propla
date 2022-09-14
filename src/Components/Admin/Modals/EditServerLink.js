import React, { useState } from "react";
import axios from "axios";
import '../Admin.css'
import { toast } from "react-toastify";

function EditServerLink({ data, setEdit, getData }) {

    const [newData, setNewData] = useState(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(process.env.REACT_APP_SERVERLINK_API, newData).then(data => {
            if (data.status === 200) {
                toast.info('Məlumatlar dəyişdirildi', {
                    theme: "colored"
                })
                setEdit(false)
                getData()
            }
        }).catch(err => {
            toast.error('Xəta baş verdi', {
                theme: "colored"
            })
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="edit-div-modal">

            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Edit Server Link</h2>
                <label htmlFor="ip">Server IP</label>
                <input id="ip" name="serverIp" defaultValue={data?.serverIp} onChange={(e) => handleChange(e)} />
                <label htmlFor="port">Server Port</label>
                <input id="port" name="serverPort" defaultValue={data?.serverPort} onChange={(e) => handleChange(e)} />
                <label htmlFor="type">Server Type</label>
                <input id="type" name="serverTypeName" defaultValue={data?.serverTypeName} onChange={(e) => handleChange(e)} />
                <div className="form-foot">
                    <div>
                        <button className="btn-new" type="submit" >Change</button>
                        <button className="close-btn" type="button" onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default EditServerLink