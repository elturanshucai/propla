import axios from "axios";
import React, { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../Modals/EditServerLink";
import { useFormik } from "formik";

function ServerLink({ id }) {

    const [prevData, setPrevData] = useState([
        {
            serverTypeName: 'abc',
            serverIp: '3243431',
            serverPort: '545425425'
        }
    ])
    const [serverData, setServerData] = useState([])

    const [edit, setEdit] = useState(false)
    const [oldData, setOldData] = useState({})

    // const formik = useFormik({
    //     initialValues: {
    //         projectId : id
    //     },

    //     onSubmit: async values => {

    //         try {
                
    //         } catch (err) {

    //         }

    //     },
    // })

    const handleChange = (e) => {
        setServerData({
            ...serverData,
            [e.target.name]: e.target.value
        })
    }

    const editLink = (data) => {
        setEdit(true)
        setOldData(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(serverData);
    }

    const getData = () => {
        axios.get(`http://10.1.14.29:81/api/ServerLink/${id}`).then(data => {
            // const { serverIp, serverPort, serverTypeName } = data.data[0];
            // formik.setValues({
            //     ...formik.values,
            //     serverIp,
            //     serverPort,
            //     serverTypeName
            // });
            setPrevData(data.data[0])
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
                            <FontAwesomeIcon icon={faEdit} onClick={() => editLink(item)} />
                        </div>
                    ))}
                </div>

                <div className="inputs">
                    <input id="ip" onChange={(e) => handleChange(e)} name="ip" />
                    <input id="port" onChange={(e) => handleChange(e)} name="port" />
                    <input id="type" onChange={(e) => handleChange(e)} name="type" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>

            {edit && <EditModal data={oldData} setEdit={setEdit} />}

        </>
    )
}

export default ServerLink