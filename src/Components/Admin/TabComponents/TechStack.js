import React, { useCallback, useEffect, useState } from "react";
import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import EditTech from "../Modals/EditTech";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TechStack({ id }) {

    const [techList, setTechList] = useState([])
    const [techName, setTechName] = useState('')
    const [prevData, setPrevData] = useState([])
    const [editTech, setEditTech] = useState(false)
    const [editData, setEditData] = useState()

    const addTech = (e) => {
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
            setTechList([
                ...techList,
                techName
            ])
            setTechName('')
        }
    }

    const edit = (data) => {
        setEditTech(true)
        setEditData(data)
    }

    const removeTech = (i) => {
        let newList = []
        newList = techList.filter((item, index) => index !== i)
        setTechList(newList)
    }

    const deleteTech = (itemId) => {
        axios.delete(process.env.REACT_APP_TECHSTACK_API + itemId).then(data => {
            if (data.status === 200) {
                toast.info('Uğurla silindi')
                getTech()
            }
        }).catch(err => {
            toast.error('Xəta baş verdi')
            console.log(err)
        })
    }

    const submitTech = () => {
        if (techList.length > 0) {
            axios.post(process.env.REACT_APP_TECHSTACK_API, {
                projectId: id,
                programName: `${techList.toString(' ,')}`
            })
                .then(data => {
                    if (data.status === 200) {
                        toast.success('Uğurla əlavə edildi');
                        setTechList([])
                        getTech()
                    }
                })
                .catch(err => {
                    toast.error('Xəta baş verdi')
                    console.log(err)
                })
        }
    }

    const getTech = useCallback(() => {
        axios.get(process.env.REACT_APP_TECHSTACK_API + id).then(data => setPrevData(data.data))
    }, [id])

    useEffect(() => {
        getTech()
    }, [getTech])

    return (
        <>
            <div className="tech">
                <label htmlFor="techName">Tech Name</label>

                <div className="techList">
                    {prevData.map(item => (
                        <div className="techItem" key={item?.techStackId}>
                            {item.programName}
                            <FontAwesomeIcon icon={faEdit} size='sm' onClick={() => edit(item)} />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTech(item?.techStackId)} size='sm' />
                        </div>
                    ))}
                </div>

                <div className="techList">
                    {techList.map((item, index) => (
                        <div key={index} className="techItem"> {item} <FontAwesomeIcon icon={faClose} size={'sm'} onClick={() => removeTech(index)} /> </div>
                    ))}
                </div>
                <input id="techName" type="text" value={techName} onChange={(e) => setTechName(e.target.value)} onKeyDown={(e) => addTech(e)} />
                <button onClick={submitTech}>Submit</button>
            </div>

            {editTech && <EditTech data={editData} getTech={getTech} setEdit={setEditTech} projectId={id} />}
        </>
    )
}

export default TechStack