import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TechStack() {

    const [techList, setTechList] = useState([])
    const [techName, setTechName] = useState('')
    const [prevData, setPrevData] = useState([
        {programName: 'html'},
        {programName: 'css'},
        {programName: 'js'},
        {programName: 'react'}
    ])

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
        let data = techList.toString(' ,')
        console.log(data);
    }

    return (
        <>
            <div className="tech">
                <label htmlFor="techName">Tech Name</label>

                <div className="techList">
                    {prevData.map(item=>(
                        <div className="techItem">{item.programName}</div>
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