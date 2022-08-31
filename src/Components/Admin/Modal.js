import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import './Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralForm from "./TabComponents/GeneralForm";
import ServerLink from "./TabComponents/ServerLink";
import GitRepoLink from "./TabComponents/GitRepoLink";
import ProjectUsers from "./TabComponents/ProjectUsers";
import TechStack from "./TabComponents/TechStack";

function Modal({ setModal, id }) {

    const [tabId, setTabId] = useState("info")
    const handleClick = (e) => {
        setTabId(e.target.id)
        let buttons = document.querySelectorAll('.tabs button')
        buttons.forEach(item => item.classList.remove('active'))
        e.target.classList.add('active')
    }

    return (
        <>
            <div className="modal">
                <div className="modal-inner">
                    <FontAwesomeIcon icon={faClose} color="white" className="cls-btn" size="2x" onClick={() => setModal(false)} />
                    <div className="tabs">
                        <button id="info" onClick={handleClick} className='active'>General Info</button>
                        <button id="serverlink" onClick={handleClick}>Server Links</button>
                        <button id="gitlink" onClick={handleClick}>GitRepo Links</button>
                        <button id="prusers" onClick={handleClick}>Project Users</button>
                        <button id="tchstack" onClick={handleClick}>Tech Stack</button>
                    </div>
                    <div className="content">
                        {tabId === "info" && <GeneralForm id={id} />}
                        {tabId === "serverlink" && <ServerLink id={id} />}
                        {tabId === "gitlink" && <GitRepoLink id={id} />}
                        {tabId === "prusers" && <ProjectUsers id={id} />}
                        {tabId === "tchstack" && <TechStack id={id} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal