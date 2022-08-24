import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import './List.css'
import { useNavigate } from "react-router-dom";
import img from '../../logo_transparent.png'
import { Pagination } from "../Pagination";
import axios from "axios";

function List() {

    const [list, setList] = useState([
        {
            projectName: "AzNav",
            id: 1
        },
        {
            projectName: "URIS",
            id: 2
        },
        {
            projectName: "DEQKIS",
            id: 3
        },
        
    ])

    const [newList, setNewList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)

    const getProjects = useCallback(() => {
        // axios.get(process.env.REACT_APP_PROJECT_URL)
        //     .then(data => setList(data.data))
    }, [])

    useEffect(() => {
        if (localStorage.page) {
            setCurrentPage(parseInt(localStorage.getItem('page')))
        }
        getProjects()

    }, [getProjects])


    //her sehifedeki postlarim
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    let currentPosts

    if (newList.length > 0) {
        currentPosts = newList.slice(indexOfFirstPost, indexOfLastPost)
    }
    else {
        currentPosts = list.slice(indexOfFirstPost, indexOfLastPost)
    }


    //sehife kecidleri
    const paginate = pageNumber => setCurrentPage(pageNumber)




    const handleText = useCallback((e) => {
        let input = (e.target.value).toLowerCase()
        if (input.trim() === '') {
            setNewList([])
        }
        else {
            let searchList = list.filter(item => item.projectName.toLowerCase().includes(input))
            setNewList(searchList)
        }
    }, [])


    const navigate = useNavigate()

    const handleClick = useCallback((e) => {
        navigate(`/project/${e.target.id}`)
    }, [])

    return (
        <>
            <Header />

            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Search Project.." onChange={handleText} />
                </div>

                <div className="list">
                    {
                        newList.length > 0 ?
                            (newList.map(item => (
                                <div className="item" key={item.id} id={item.id} onClick={handleClick}>
                                    <img src={img} id={item.id} />
                                    <div className="title" id={item.id}>{item.projectName} <FontAwesomeIcon icon={faArrowRight} id={item.id} /></div>
                                </div>
                            ))) :
                            (currentPosts.map(item => (
                                <div className="item" key={item.id} id={item.id} onClick={handleClick}>
                                    <img src={img} id={item.id} />
                                    <div className="title" id={item.id}>{item.projectName} <FontAwesomeIcon icon={faArrowRight} id={item.id} /></div>
                                </div>
                            )))
                    }

                </div>
                <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate} />

            </div>

        </>
    )
}

export default List