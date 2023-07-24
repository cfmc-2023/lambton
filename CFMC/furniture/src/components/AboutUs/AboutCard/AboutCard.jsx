/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { height } from '@mui/system';
import React from 'react'


const Card = ({ item, small }) => {

    return (
        <div className={"bg-white border border-gray-200 rounded-lg card-wrapper"}>
            <a href="#">
                <img  src={item.img} alt />
            </a>
            <div className='card-footer'>
                <a href="#">
                    <h5 className={small ? "py-0 mb-0 text-2xl font-bold tracking-tight" : "pt-6 pb-2 text-2xl font-bold tracking-tight"}>{item.title}</h5>
                </a>
                <p className={small ? "mb-3 font-normal text-gray-700 dark:text-gray-400" : "mb-12 font-normal text-gray-700 dark:text-gray-400"}>{item.desc}</p>
                <a href="#" className={`${small ? "mb-1 px-4 py-2  text-sm" : "mb-4 px-6 py-4 text-lg"} inline-flex items-center font-medium text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:focus:ring-indigo-800`}>
                    Learn More
                    <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </a>
            </div>
        </div>
    )
}

export default Card;