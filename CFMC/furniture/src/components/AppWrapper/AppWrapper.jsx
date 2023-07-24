/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import PageFooter from './Footer';
import axios from 'axios';



const AppWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState(true);
    const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [userDetails, setUserDetails] = useState()
    const [cartDetails, setCartDetails] = useState()

    const [anchorEl, setAnchorEl] = useState(null);


    useEffect(()=> {
        let userD = sessionStorage.getItem('userData')
        let user = JSON.parse(userD)

        if(user) {
            setUserDetails(user)
        }
    }, [anchorEl])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      
      const handleMenuClose = () => {
        setAnchorEl(null);
        setUserDetails()
        sessionStorage.removeItem('userData')
      };

      const fetchCartItem=()=> {
        let data = JSON.stringify({
            "userId": userDetails?._id
          });
          
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/order',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log("cart response *****************", response.data);
            setCartDetails(response?.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }

      useEffect(()=> {
        fetchCartItem()
      }, [])

    return (
        <div>
            {/* component */}
            <div className="min-h-screen" style={{zIndex: '9999'}}>
                <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
                    <div className="sticky top-0 bg-gray-900">
                        <div>
                            <div className="relative">
                                {/* For md screen size */}
                                <div id="md-searchbar" className={`${mdOptionsToggle ? "hidden" : "flex"} bg-white dark:bg-gray-900 lg:hidden py-5 px-6 items-center justify-between`}>
                                    <div className="flex items-center space-x-3 text-gray-800 dark:text-white">
                                        <div className="text-3xl font-extrabold text-white">
                                            CMFC
                                        </div>

                                        <input type="text" placeholder="Search for products" className="text-sm leading-none text-gray-600 dark:text-gray-300 dark:bg-gray-900 focus:outline-none" />
                                    </div>
                                    <div className="space-x-6">
                                        <button aria-label="view favourites" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                            <svg className="fill-stroke" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.8921 3.07357C13.5516 2.73291 13.1473 2.46267 12.7023 2.2783C12.2574 2.09392 11.7804 1.99902 11.2988 1.99902C10.8171 1.99902 10.3402 2.09392 9.89521 2.2783C9.45023 2.46267 9.04595 2.73291 8.70544 3.07357L7.99878 3.78024L7.29211 3.07357C6.60432 2.38578 5.67147 1.99938 4.69878 1.99938C3.72609 1.99938 2.79324 2.38578 2.10544 3.07357C1.41765 3.76137 1.03125 4.69422 1.03125 5.66691C1.03125 6.6396 1.41765 7.57245 2.10544 8.26024L2.81211 8.96691L7.99878 14.1536L13.1854 8.96691L13.8921 8.26024C14.2328 7.91974 14.503 7.51545 14.6874 7.07048C14.8718 6.6255 14.9667 6.14857 14.9667 5.66691C14.9667 5.18525 14.8718 4.70831 14.6874 4.26334C14.503 3.81836 14.2328 3.41408 13.8921 3.07357V3.07357Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button aria-label="go to cart" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                            <svg className="fill-stroke" width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.66667 1L1 4.2V15.4C1 15.8243 1.1873 16.2313 1.5207 16.5314C1.8541 16.8314 2.30628 17 2.77778 17H15.2222C15.6937 17 16.1459 16.8314 16.4793 16.5314C16.8127 16.2313 17 15.8243 17 15.4V4.2L14.3333 1H3.66667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M1 4.2002H17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.5564 7.3999C12.5564 8.2486 12.1818 9.06253 11.515 9.66264C10.8482 10.2628 9.94386 10.5999 9.00087 10.5999C8.05788 10.5999 7.15351 10.2628 6.48671 9.66264C5.81991 9.06253 5.44531 8.2486 5.44531 7.3999" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <button aria-label="go to account" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stroke" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {/* For md screen size */}
                                {/* For large screens */}
                                <div className="px-6 dark:bg-gray-900 bg-gray-50 py-9">
                                    <div className="container flex items-center justify-between mx-auto">
                                        <div className="text-gray-800 cursor-pointer md:w-2/12 dark:text-white" aria-label="the Crib.">
                                            <div className="text-3xl font-extrabold text-white">
                                                CMFC
                                            </div>
                                           
                                        </div>
                                        <ul className="items-center justify-center hidden w-8/12 space-x-8 md:flex">
                                            <li>
                                                <Link to="/"  className="text-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/Furniture"  className="text-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                    Furniture
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/Bed"  className="text-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                    Bed
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/Chair" className="text-base text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                    Chair
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="flex items-center justify-end space-x-4 md:w-2/12 xl:space-x-8">
                                            <div className="items-center hidden lg:flex">
                                                <button onClick={() => setSearchInput(!searchInput)} aria-label="search items" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 11C5 15.4183 8.58172 19 13 19C17.4183 19 21 15.4183 21 11C21 6.58172 17.4183 3 13 3C8.58172 3 5 6.58172 5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.99961 20.9999L7.34961 16.6499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <input id="searchInput" type="text" placeholder="search" className={` ${searchInput ? "hidden" : ""} text-sm dark:bg-gray-900 dark:placeholder-gray-300 text-gray-600 rounded ml-1 border border-transparent focus:outline-none focus:border-gray-400 px-1`} />
                                            </div>
                                            <div className="items-center hidden space-x-4 lg:flex xl:space-x-8">
                                               
                                                <button onClick={()=>setShowCart(true)}  aria-label="go to cart" className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    {cartDetails?.count}
                                                    <svg className="fill-stroke" width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 1L1 5.8V22.6C1 23.2365 1.28095 23.847 1.78105 24.2971C2.28115 24.7471 2.95942 25 3.66667 25H22.3333C23.0406 25 23.7189 24.7471 24.219 24.2971C24.719 23.847 25 23.2365 25 22.6V5.8L21 1H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M1 5.7998H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M18.3346 10.6001C18.3346 11.8731 17.7727 13.094 16.7725 13.9942C15.7723 14.8944 14.4158 15.4001 13.0013 15.4001C11.5868 15.4001 10.2303 14.8944 9.23007 13.9942C8.22987 13.094 7.66797 11.8731 7.66797 10.6001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>

                                                {userDetails?.name === "" || userDetails?.name === undefined ? <button class="login-button" onClick={()=> navigate('/login')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M12 6h6M12 6v12M12 18l6-6M12 18l-6-6"></path>
                                                    </svg>
                                                    Login
                                                </button> :
                                                    <span className='p-4 text-xs font-semibold text-white cursor-pointer'>
                                                   
                                                        <div>
                                                            <IconButton onClick={handleMenuOpen} style={{ color: 'white'}}>
                                                                {userDetails?.name}
                                                            </IconButton>
                                                            <Menu
                                                                anchorEl={anchorEl}
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleMenuClose}
                                                            >
                                                                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </span>
                                                 }
                                            </div>
                                            <div className="flex lg:hidden">
                                                <button aria-label="show options" onClick={() => setMdOptionsToggle(!mdOptionsToggle)} className="hidden text-black rounded dark:text-white dark:hover:text-gray-300 md:flex focus:outline-none focus:ring-2 focus:ring-gray-600">
                                                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <button aria-label="open menu" onClick={() => setShowMenu(true)} className="text-black rounded dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-600">
                                                    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* For small screen */}
                                <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} absolute dark:bg-gray-900 z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>
                                    <div className="flex items-center justify-between p-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                        <div  className="flex items-center space-x-3">
                                            <div>
                                                <svg className="text-gray-800 fill-stroke dark:text-white" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <input type="text" placeholder="Search for products" className="text-sm text-gray-600 placeholder-gray-600 dark:bg-gray-900 dark:placeholder-gray-300 focus:outline-none" />
                                        </div>
                                        <button onClick={() => setShowMenu(false)} aria-label="close menu" className="rounded focus:outline-none focus:ring-2 focus:ring-gray-600">
                                            <svg className="text-gray-800 fill-stroke dark:text-white" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4 mt-6">
                                        <ul className="flex flex-col space-y-6">
                                            <li>
                                                <Link to="/" className="flex items-center justify-between text-base text-gray-800 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    Home
                                                    <div>
                                                        <svg className="text-black fill-stroke dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/All" className="flex items-center justify-between text-base text-gray-800 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    Furniture
                                                    <div>
                                                        <svg className="text-black fill-stroke dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/Bed" className="flex items-center justify-between text-base text-gray-800 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    Bed
                                                    <div>
                                                        <svg className="text-black fill-stroke dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/listing/Chair" className="flex items-center justify-between text-base text-gray-800 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800">
                                                    Chair
                                                    <div>
                                                        <svg className="text-black fill-stroke dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex items-end h-full">
                                        <ul className="flex flex-col w-full p-4 py-10 space-y-8 bg-gray-50 dark:bg-gray-800">
                                            <li onClick={()=>setShowCart(true)}>
                                                <a href="javascript:void(0)" className="flex items-center space-x-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                    <div>
                                                        <svg className="fill-stroke" width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M1 5H21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-base">Cart</p>
                                                </a>
                                            </li>
                                           
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Cart show={showCart} setShow={setShowCart} cartDetails={cartDetails} refetchCart={()=>fetchCartItem() } />
                    <div>
                        {children}
                    </div>
                    <PageFooter  />
                </div >
            </div >
            <style jsx>
                {`
                .login-button {
                    display: inline-block;
                    padding: 10px 20px;
                    color: white;
                    {/* background-color: #007bff; */}
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    }
                 `}
            </style>
        </div>
    )
}

export default AppWrapper