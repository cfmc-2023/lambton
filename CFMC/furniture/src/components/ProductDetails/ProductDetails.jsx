/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { useStripe } from '@stripe/react-stripe-js';

const ProductDetails= () => {
    const stripe = useStripe();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [userDetails, setUserDetails] = useState();

    const location = useLocation()
    const navigate = useNavigate()
    let categoryId = location?.pathname?.split('/')[2]

    console.log("**** navigate *******************", location, categoryId)
    const [productDetails, setProductDetails] = useState()
    const fetchProductDetails = () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/product/get/${categoryId}`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Response **************", response.data);
                if (response?.status) {
                    setProductDetails(response?.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchProductDetails()
    }, [])

    useEffect(()=> {
        let userD = sessionStorage.getItem('userData')
        let user = JSON.parse(userD)

        if(user) {
            setUserDetails(user)
        }
    }, [])


    const addToCart =()=> {
        let data = JSON.stringify({
            "quantity": 1,
            "productId": categoryId,
            "userId": userDetails?._id
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/order',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log("Added to cart ******************", response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log("Error ************", error);
          });
    }

    const buyNowHandler= async()=> {
        let data = {
            "quantity": 1,
            "productId": categoryId,
            "product": productDetails,
            "userId": userDetails
          };
        
          const response = await fetch('http://localhost:4000/product/create-checkout-session', {
            method: 'POST',
            data: data
          });
          const session = await response.json();

          console.log("session ***************", session)
      
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
      
          if (result.error) {
            console.error(result.error.message);
          }
    }

    return (
        <>
            <nav className="container flex px-4 py-3 mt-4 mb-4 text-gray-700 border border-gray-200 rounded-lg md:flex 2xl:px-20 md:px-6 hover:text-blue-500" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link to="/" className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                            Home
                        </Link>
                    </li>
                    <li className="inline-flex items-center">
                        <Link to="/listing/All" className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                            Listing
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Details</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="items-start justify-center px-4 py-12 md:flex 2xl:px-20 md:px-6">
                <div className="hidden xl:w-2/6 lg:w-2/5 w-80 md:block">
                    {productDetails?.images?.map((item, index)=> {
                        console.warn("****************", index > 0, index, productDetails?.images?.length -1)
                        return (
                            <img key={item?._id} className={`w-full ${index > 0 && index !== productDetails?.images?.length -2 ? "mt-6" : ""}`} alt="img of a girl posing" src={item} />
                        )
                    })}
                    {/* <img className="w-full mt-6" alt="img of a girl posing" src="https://i.ibb.co/qxkRXSq/component-image-two.png" /> */}
                </div>
                <div className="md:hidden">
                    <img className="w-full" alt="img of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
                    <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                        <img alt="img-tag-one" className="w-full md:w-48 md:h-48" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                        <img alt="img-tag-one" className="w-full md:w-48 md:h-48" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                        <img alt="img-tag-one" className="w-full md:w-48 md:h-48" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                        <img alt="img-tag-one" className="w-full md:w-48 md:h-48" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                    </div>
                </div>
                <div className="mt-6 xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0">
                    <div className="pb-6 border-b border-gray-200">
                        <p className="text-sm leading-none text-gray-600">By - {productDetails?.brand}</p>
                        <h1
                            className="mt-2 text-xl font-semibold leading-7 text-gray-800 lg:text-2xl lg:leading-6"
                        >
                            {productDetails?.name}
                        </h1>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <p className="text-base leading-4 text-gray-800">Colours</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600">{productDetails?.color}</p>
                            <div
                                className="w-6 h-6 ml-3 mr-4 cursor-pointer bg-gradient-to-b from-gray-900 to-indigo-500"
                            ></div>
                            <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <p className="text-base leading-4 text-gray-800">descriptions</p>
                        <div className="flex items-center justify-center">
                            <p className="mr-3 text-sm leading-none text-gray-600">{productDetails?.description}</p>
                            <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={()=> {
                                if(userDetails?.email !== undefined) {
                                    // navigate('/checkout', {state: productDetails})
                                    buyNowHandler()
                                } else {
                                    setShowLogin(true)
                                }
                            }}
                            className="flex items-center justify-center w-full py-4 mr-2 text-base leading-none text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700"
                        >
                            <svg className="mr-3" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.66699 4.83333V4.84166" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.333 11.5V11.5083" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Buy now
                        </button>
                        <button
                            onClick={()=> {
                                if(userDetails?.email !== undefined) {
                                    addToCart()
                                } else {
                                    setShowLogin(true)
                                }
                            }}
                            className="flex items-center justify-center w-full py-4 ml-2 text-base leading-none text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700"
                        >
                            <svg className="mr-3" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.66699 4.83333V4.84166" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.333 11.5V11.5083" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                           Add to cart
                        </button>
                    </div>
                    <div>
                        {/* <p className="text-base leading-normal text-gray-600 xl:pr-48 lg:leading-tight mt-7">It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point of usingLorem Ipsum is that it has a more-or-less normal distribution of letters.</p> */}
                        <p className="text-base leading-4 text-gray-600 mt-7">Product Code: {productDetails?._id}</p>
                        <p className="mt-4 text-base leading-4 text-gray-600">Quantity: {productDetails?.quantity}</p>
                        <p className="mt-4 text-base leading-4 text-gray-600">Category: {productDetails?.category}</p>
                        <p className="mt-4 text-base leading-4 text-gray-600">Price: {productDetails?.price}</p>
                        <p className="mt-4 text-base leading-normal text-gray-600 md:w-96">Composition: {productDetails?.description}</p>
                    </div>
                    <div>
                        <div className="py-4 border-t border-b border-gray-200 mt-7">
                            <div onClick={() => setShow(!show)} className="flex items-center justify-between cursor-pointer">
                                <p className="text-base leading-4 text-gray-800">Shipping and returns</p>
                                <button
                                    className="rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                    aria-label="show or hide"
                                >
                                    <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="py-4 border-b border-gray-200">
                            <div onClick={() => setShow2(!show2)} className="flex items-center justify-between cursor-pointer">
                                <p className="text-base leading-4 text-gray-800">Contact us</p>
                                <button
                                    className="rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                    aria-label="show or hide"
                                >
                                    <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                                If you have any questions on how to return your item to us, contact us.
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={showLogin}
                    onClose={()=>setShowLogin(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Login isModal={true} handleClose={()=> setShowLogin(false)} />
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default ProductDetails;
