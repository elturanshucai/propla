import React, { useCallback, useEffect, useState } from 'react'

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const [localPage, setLocalPage] = useState(1)

    const pageControll = useCallback(() => {
        if (localStorage.page) {
            setLocalPage(parseInt(localStorage?.getItem('page')))
        }
    }, [])
    useEffect(() => pageControll, [pageControll])
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    const setPages = (number, e) => {
        paginate(number)
        localStorage.setItem('page', number)
        let buttons = document.querySelectorAll('.pages button')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active')
        }
        e.target.classList.add('active')
    }

    return (
        <div className='pages'>
            {pageNumbers.map(number => (
                <button key={number} className={number === localPage ? 'active' : null} onClick={(e) => setPages(number, e)}>
                    {number}
                </button>
            ))}
        </div>
    )
}
