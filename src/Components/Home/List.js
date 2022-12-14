import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import './List.css'
import { useNavigate } from "react-router-dom";
import img from '../../images/logo_transparent.png'
import { Pagination } from "../UI/Pagination";
import axios from "axios";
import Loading from "../UI/Loading";


function List() {

    const [list, setList] = useState([])

    const [newList, setNewList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)
    const [loading, setLoading] = useState(false)

    const getProjects = useCallback(async () => {

        try {
            setLoading(true)
            const res = axios.get(process.env.REACT_APP_PROJECTINFO_API)
            setList((await res).data)
            if ((await res).status) {
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
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


    const handleText = (e) => {
        let input = (e.target.value).toLowerCase()
        if (input.trim() === '') {
            setNewList([])
        }
        else {
            let searchList = list.filter(item => item.projectName.toLowerCase().includes(input))
            setNewList(searchList)
        }
    }


    const navigate = useNavigate()

    const handleClick = useCallback((e) => {
        navigate(`/project/${e.target.id}`)
    }, [navigate])

    return (
        <>
            {loading && <Loading />}
            <Header />

            <div className="main">
                <div className="search">
                    <input type="text" placeholder="Search Project.." onChange={handleText} />
                </div>

                <div className="list">
                    {
                        newList.length > 0 ?
                            (newList.map(item => (
                                <div className="item" key={item?.projectId} id={item?.projectId} onClick={handleClick}>
                                    <img src={img} id={item?.projectId} alt='' />
                                    <div className="title" id={item?.projectId}>{item?.projectName} <FontAwesomeIcon icon={faArrowRight} id={item?.projectId} /></div>
                                </div>
                            ))) :
                            (currentPosts.map(item => (
                                <div className="item" key={item?.projectId} id={item?.projectId} onClick={handleClick}>
                                    <img src={img} id={item?.projectId} alt='' />
                                    <div className="title" id={item?.projectId}>{item?.projectName} <FontAwesomeIcon icon={faArrowRight} id={item?.projectId} /></div>
                                </div>
                            )))
                    }

                </div>
                {newList.length === 0 && <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate} />}
                

            </div>

        </>
    )
}

export default List