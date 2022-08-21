import React, { useEffect } from 'react'

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    useEffect(()=>{
        
    }, [])
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    const setPages = (number, e) => {
        paginate(number)
        localStorage.setItem('page', number)
        let buttons = document.querySelectorAll('.pages button')
        for (let i = 0; i <buttons.length; i++) {
            buttons[i].classList.remove('active')
        }
        e.target.classList.add('active')
    }

    return (
        <div className='pages'>
            {pageNumbers.map(number => (
                <button key={number} className={ number===1 ? 'active':null } onClick={(e) => setPages(number, e)}>
                    {number}
                </button>
            ))}
        </div>
    )
}
