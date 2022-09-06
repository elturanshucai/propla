import React, {useState} from 'react'
import Header from '../Header/Header'
import GeneralInfo from '../TabsComponent/GeneralInfo/GeneralInfo'
import GitRepoLink from '../TabsComponent/GitRepoLinks/GitRepoLink'
import ProjectUser from '../TabsComponent/ProjectUsers/ProjectUser'
import ServerLink from '../TabsComponent/ServerLinks/ServerLink'
import TechStack from '../TabsComponent/TechStack/TechStack'

import './Details.css'

function Details(){
    const [tabId, setTabId]=useState("info")
    const handleClick=(e)=>{
        setTabId(e.target.id)
        let buttons=document.querySelectorAll('.tabs button')
        buttons.forEach(item=>item.classList.remove('active'))
        e.target.classList.add('active')
    }
    return(
        <>
            <Header/>
            <div className="details">
                <h1>Project Name</h1>
                <div className="tabs">
                    <button id="info" onClick={handleClick} className='active'>General Info</button>
                    <button id="serverlink" onClick={handleClick}>Server Links</button>
                    <button id="gitlink" onClick={handleClick}>GitRepo Links</button>
                    <button id="prusers" onClick={handleClick}>Project Users</button>
                    <button id="tchstack" onClick={handleClick}>Tech Stack</button>
                </div>
                <div className="content">
                    {tabId==="info" && <GeneralInfo/>}
                    {tabId==="serverlink" && <ServerLink/>}
                    {tabId==="gitlink" && <GitRepoLink/>}
                    {tabId==="prusers" && <ProjectUser/>}
                    {tabId==="tchstack" && <TechStack/>}
                </div>
            </div>
        </>
    )
}

export default Details