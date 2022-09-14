import React, { useState, useEffect, useCallback } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Admin.css'
import EditModal from "../Modals/EditGitRepo";
import { useFormik } from "formik";

function GitRepoLink({ id }) {

    const [prevData, setPrevData] = useState([])
    const [oldData, setOldData] = useState({})
    const [edit, setEdit] = useState(false)

    const formik = useFormik({
        initialValues: {
            repoName: '',
            repoUrl: '',
            repoDescription: '',
            projectId: id
        },
        onSubmit: values => {
            axios.post(process.env.REACT_APP_GITREPOLINK_API, values).then(data => {
                if (data.status === 200) {
                    toast.success('Uğurla əlavə edildi');
                    formik.setValues({
                        repoName: '',
                        repoUrl: '',
                        repoDescription: '',
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

    const getData = useCallback(() => {
        axios.get(process.env.REACT_APP_GITREPOLINK_API + id).then(data => setPrevData(data.data))
    }, [id])

    const deleteLink = (linkId) => {
        axios.delete(process.env.REACT_APP_GITREPOLINK_API + linkId).then(data => {
            if (data.status === 200) {
                toast.info('Uğurla silindi')
                getData()
            }
        }).catch(err => {
            toast.error('Xəta baş verdi')
            console.log(err)
        })
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <form className="link" onSubmit={formik.handleSubmit}>
                <div className="form-title">
                    <label htmlFor="name">Repo Name</label>
                    <label htmlFor="url">Repo URL</label>
                    <label htmlFor="desc">Repo Description</label>
                </div>
                <div className="prevLinks">
                    {prevData.length > 0 && prevData.map(item => (
                        <div className="prev-item" key={item?.gitRepolinkId} >
                            <div>{item?.repoName} </div>
                            <div>{item?.repoUrl} </div>
                            <div>{item?.repoDescription} </div>
                            <div className="icons">
                                <FontAwesomeIcon icon={faEdit} onClick={() => editLink(item)} />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteLink(item.gitRepolinkId)} />
                            </div>

                        </div>
                    ))}
                </div>
                <div className="inputs">
                    <input id="name" onChange={formik.handleChange} value={formik.values.repoName} name="repoName" />
                    <input id="url" onChange={formik.handleChange} value={formik.values.repoUrl} name="repoUrl" />
                    <input id="desc" onChange={formik.handleChange} value={formik.values.repoDescription} name="repoDescription" />
                </div>

                <button className="btn-new" type="submit">Submit</button>
            </form>
            {edit && <EditModal data={oldData} setEdit={setEdit} getData={getData} />}
        </>
    )
}

export default GitRepoLink