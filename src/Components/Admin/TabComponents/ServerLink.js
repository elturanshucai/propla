import axios from "axios";
import React, { useEffect, useState } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../Modals/EditServerLink";

function ServerLink({ id }) {

    const [prevData, setPrevData] = useState([])
    const [serverData, setServerData] = useState([{
        serverIp: '',
        serverPort: '',
        serverTypeName: ''
    }])

    const [edit, setEdit] = useState(false)
    const [oldData, setOldData] = useState({})

    const handleChange = (e) => {
        setServerData({
            ...serverData,
            [e.target.name]: e.target.value,
            projectId: id
        })
    }

    const editLink = (data) => {
        setEdit(true)
        setOldData(data)
    }

    const deleteLink = (linkId) => {
        axios.delete(`http://10.1.14.29:81/api/ServerLink/${linkId}`).then(data => {
            if (data.status === 200) {
                getData()
            }
        }).catch(err => console.log(err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post(`http://10.1.14.29:81/api/ServerLink`, serverData).then(data => {
            if (data.status === 200) {
                getData()
            }
        }).catch(err => console.log(err))

    }

    const getData = () => {
        axios.get(`http://10.1.14.29:81/api/ServerLink/${id}`).then(data => {
            setPrevData(data.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <form className="link" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-title">
                    <label htmlFor="ip">Server IP</label>
                    <label htmlFor="port">Server Port</label>
                    <label htmlFor="type">Server Type</label>
                </div>

                <div className="prevLinks">
                    {prevData.map(item => (
                        <div className="prev-item" key={item?.serverlinkId} >
                            <div>{item?.serverIp} </div>
                            <div>{item?.serverPort} </div>
                            <div>{item?.serverTypeName} </div>
                            <div className="icons">
                                <FontAwesomeIcon icon={faEdit} onClick={() => editLink(item)} />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteLink(item.serverlinkId)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="inputs">
                    <input id="ip" onChange={(e) => handleChange(e)} name="serverIp" />
                    <input id="port" onChange={(e) => handleChange(e)} name="serverPort" />
                    <input id="type" onChange={(e) => handleChange(e)} name="serverTypeName" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>

            {edit && <EditModal data={oldData} setEdit={setEdit} getData={getData} />}

        </>
    )
}

export default ServerLink