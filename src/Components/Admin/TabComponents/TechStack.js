import React, { useEffect, useState } from "react";
import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function TechStack({ id }) {

    const [techList, setTechList] = useState([])
    const [techName, setTechName] = useState('')
    const [prevData, setPrevData] = useState([])

    const addTech = (e) => {
        if (e.keyCode === 13) {
            setTechList([
                ...techList,
                techName
            ])
            setTechName('')
        }
    }

    const deleteTech = (i) => {
        let newList = []
        newList = techList.filter((item, index) => index !== i)
        setTechList(newList)
    }

    const submitTech = () => {
        // axios.post(`http://10.1.14.29:81/api/TechStack/`, {
        //     projectId: id,
        //     programName: `${techList.toString(' ,')}`
        // })
        //     .then(res => console.log(res))
        console.log({
            projectId: id,
            programName: techList.toString(' ,')
        });
    }

    const getTech = () => {
        axios.get(`http://10.1.14.29:81/api/TechStack/${id}`).then(data => console.log(data))
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
                        <div className="techItem">
                            {item.programName}
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    ))}
                </div>

                <div className="techList">
                    {techList.map((item, index) => (
                        <div key={index} className="techItem"> {item} <FontAwesomeIcon icon={faClose} size={'sm'} onClick={() => deleteTech(index)} /> </div>
                    ))}
                </div>
                <input id="techName" type="text" value={techName} onChange={(e) => setTechName(e.target.value)} onKeyDown={(e) => addTech(e)} />
                <button onClick={submitTech}>Submit</button>
            </div>
        </>
    )
}

export default TechStack