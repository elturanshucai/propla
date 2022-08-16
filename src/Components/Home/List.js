import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Header from "../Headder/Header";
import './List.css'
import { useNavigate } from "react-router-dom";

function List() {
    const [id, setId] = useState(1)
    const [list, setList] = useState([
        {
            projectName: 'AzNav',
            id: 1
        },
        {
            projectName: 'ABC',
            id: 2
        },
        {
            projectName: 'DEF',
            id: 3
        },
        {
            projectName: 'DEF',
            id: 4
        },
        {
            projectName: 'GHI',
            id: 5
        },
    ])

    const createPages = (l) => {
        let n = l / 9
        if (n * 9 < l) {
            n++
        }
        for (let i = 1; i <= n; i++) {
            for (let j = i; j <= n; j++) {
                return <div id={i} onClick={setPages} className='active'>{i}</div>
            }
        }
    }

    const navigate = useNavigate()

    const setPages = (e) => {
        setId(parseInt(e.target.id))
        let divs = document.querySelectorAll('.pages div')
        divs.forEach(div => {
            div.classList.remove('active')
        })
        e.target.classList.add('active')
    }

    const handleClick = (e) => {
        navigate(`/project/${e.target.id}`)
    }

    return (
        <>
            <Header />

            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Search Project.." />
                    <button>
                        <FontAwesomeIcon icon={faSearch} height="27px" />
                    </button>
                </div>

                <div className="list">
                    {list.map(item => (
                        <div className="item" key={item.id}>
                            <div className='iteminner' id={item.id} onClick={handleClick}> {item.projectName} <FontAwesomeIcon icon={faArrowRight}/> </div>
                        </div>
                    ))}
                </div>
                <div className="pages">
                    {createPages(list.length)}
                </div>
            </div>

        </>
    )
}

export default List