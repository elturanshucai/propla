import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Header from "../Headder/Header";
import './List.css'

function List() {
    const [id, setId] = useState(1)
    const [hover, setHover]=useState(false)
    const setPages = (e) => {
        setId(parseInt(e.target.id))
        let divs = document.querySelectorAll('.pages div')
        divs.forEach(div => {
            div.classList.remove('active')
        })
        e.target.classList.add('active')
    }
    return (
        <>
            <Header />
            <div className="search">
                <input type="text" placeholder="Search Project.." />
                <button>
                    <FontAwesomeIcon icon={faSearch} height="27px" />
                </button>
            </div>

            <div className="list">
                {
                    id === 1 && <>
                        <div className="item" onMouseEnter={()=>setHover(true)} onMouseOut={()=>setHover(false)}>PROJECT {hover && <FontAwesomeIcon icon={faArrowRight} />}</div>
                        <div className="item">PROJECT <FontAwesomeIcon icon={faArrowRight} /></div>
                        <div className="item">PROJECT <FontAwesomeIcon icon={faArrowRight} /></div>
                        <div className="item">PROJECT <FontAwesomeIcon icon={faArrowRight} /></div>
                        <div className="item">PROJECT <FontAwesomeIcon icon={faArrowRight} /></div>
                        <div className="item">PROJECT <FontAwesomeIcon icon={faArrowRight} /></div>
                    </>
                }
                {
                    id === 2 && <>
                        <div className="item">PROJECT 2</div>
                        <div className="item">PROJECT 2</div>
                        <div className="item">PROJECT 2</div>
                        <div className="item">PROJECT 2</div>
                        <div className="item">PROJECT 2</div>
                        <div className="item">PROJECT 2</div>
                    </>
                }
                {
                    id === 3 && <>
                        <div className="item">PROJECT 3</div>
                        <div className="item">PROJECT 3</div>
                        <div className="item">PROJECT 3</div>
                        <div className="item">PROJECT 3</div>
                        <div className="item">PROJECT 3</div>
                        <div className="item">PROJECT 3</div>
                    </>
                }


            </div>
            <div className="pages">
                <div id="1" onClick={setPages} className='active'>1</div>
                <div id="2" onClick={setPages}>2</div>
                <div id="3" onClick={setPages}>3</div>
            </div>
        </>
    )
}

export default List