import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import './List.css'
import { useNavigate } from "react-router-dom";
import img from '../../logo_transparent.png'
import { Pagination } from "../Pagination";

function List() {

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
        {
            projectName: 'GHI',
            id: 6
        },
        {
            projectName: 'GHI',
            id: 7
        },
        {
            projectName: 'GHI',
            id: 8
        },
        {
            projectName: 'GHI',
            id: 9
        },
        {
            projectName: 'GHI',
            id: 10
        },
        {
            projectName: 'GHI',
            id: 11
        },
        {
            projectName: 'GHI',
            id: 12
        },
        {
            projectName: 'GHI',
            id: 13
        },
        {
            projectName: 'GHI',
            id: 14
        },
        {
            projectName: 'GHI',
            id: 15
        },
        {
            projectName: 'GHI',
            id: 16
        },
        {
            projectName: 'JKL',
            id: 17
        },
        {
            projectName: 'JKL',
            id: 18
        },
        {
            projectName: 'JKL',
            id: 19
        },
        {
            projectName: 'JKL',
            id: 20
        },
        {
            projectName: 'JKL',
            id: 21
        },
        {
            projectName: 'JKL',
            id: 22
        },
        {
            projectName: 'JKL',
            id: 23
        },
        {
            projectName: 'JKL',
            id: 24
        },
        {
            projectName: 'JKL',
            id: 25
        },
    ])

    const [newList, setNewList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)

    useEffect(()=>{
        if(localStorage.page){
            setCurrentPage(parseInt(localStorage.getItem('page')))
        }
        
    },[])


    //her sehifedeki postlarim
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    let currentPosts

    if(newList.length>0){
        currentPosts = newList.slice(indexOfFirstPost, indexOfLastPost)
    }
    else{
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