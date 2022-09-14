import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../Modals/EditServerLink";
import { useFormik } from "formik";

function ServerLink({ id }) {

    const [prevData, setPrevData] = useState([])
    const [edit, setEdit] = useState(false)
    const [oldData, setOldData] = useState({})

    const formik = useFormik({
        initialValues: {
            serverIp: '',
            serverPort: 0,
            serverTypeName: '',
            projectId: id
        },
        onSubmit: values => {
            axios.post(process.env.REACT_APP_SERVERLINK_API, values).then(data => {
                if (data.status === 200) {
                    toast.success('Uğurla əlavə edildi');
                    formik.setValues({
                        serverIp: '',
                        serverPort: 0,
                        serverTypeName: '',
                        projectId: id
                    })
                    getData()
                }
            }).catch(err => {
                toast.error('Xəta baş verdi')
                console.log(err)
            })
        }
    })

    const editLink = (data) => {
        setEdit(true)
        setOldData(data)
    }

    const deleteLink = (linkId) => {
        axios.delete(process.env.REACT_APP_SERVERLINK_API + linkId).then(data => {
            if (data.status === 200) {
                toast.info('Uğurla silindi')
                getData()
            }
        }).catch(err => {
            toast.error('Xəta baş verdi')
            console.log(err)
        })
    }

    const getData = useCallback(() => {
        axios.get(process.env.REACT_APP_SERVERLINK_API + id).then(data => {
            setPrevData(data.data)
        }).catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <form className="link" onSubmit={formik.handleSubmit}>
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
                    <input id="ip" onChange={formik.handleChange} value={formik.values.serverIp} name="serverIp" />
                    <input id="port" onChange={formik.handleChange} value={formik.values.serverPort} name="serverPort" />
                    <input id="type" onChange={formik.handleChange} value={formik.values.serverTypeName} name="serverTypeName" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>

            {edit && <EditModal data={oldData} setEdit={setEdit} getData={getData} />}

        </>
    )
}

export default ServerLink