import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import '../Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TechStack() {

    const [techList, setTechList] = useState([])
    const [techName, setTechName] = useState('')

    const addTech = (e) => {
        if (e.keyCode === 13) {
            setTechList([
                ...techList,
                techName
            ])
            setTechName('')
        }
    }

    return (
        <>
            <div className="tech">
                <label htmlFor="techName">Tech Name</label>
                <div className="techList">
                    {techList.map((item, index) => (
                        <div key={index} className="techItem"> {item} <FontAwesomeIcon icon={faClose} size={'sm'} /> </div>
                    ))}
                </div>
                <input id="techName" type="text" value={techName} onChange={(e) => setTechName(e.target.value)} onKeyDown={(e) => addTech(e)} />
                <button>Submit</button>
            </div>
        </>
    )
}

export default TechStack