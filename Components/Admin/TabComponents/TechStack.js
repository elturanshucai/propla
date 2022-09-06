import React, { useEffect, useState } from "react";
import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import EditTech from "../Modals/EditTech";

function TechStack({ id }) {

    const [techList, setTechList] = useState([])
    const [techName, setTechName] = useState('')
    const [prevData, setPrevData] = useState([])
    const [editTech, setEditTech] = useState(false)
    const [editData, setEditData] = useState()

    const addTech = (e) => {
        if (e.keyCode === 13) {
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
        axios.delete(`http://10.1.14.29:81/api/TechStack/${itemId}`).then(data => {
            if (data.status === 200) {
                getTech()
            }
        }).catch(err => console.log(err))
    }

    const submitTech = () => {
        axios.post(`http://10.1.14.29:81/api/TechStack/`, {
            projectId: id,
            programName: `${techList.toString(' ,')}`
        })
            .then(data => {
                if (data.status === 200) {
                    setTechList([])
                    getTech()
                }
            })
            .catch(err => console.log(err))
    }

    const getTech = () => {
        axios.get(`http://10.1.14.29:81/api/TechStack/${id}`).then(data => setPrevData(data.data))
    }

    useEffect(() => {
        getTech()
    }, [])

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