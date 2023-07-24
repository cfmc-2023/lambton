/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import AppWrapper from '../AppWrapper/AppWrapper'
import HomeCarousal from '../HomeCarousal/HomeCarousal'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate();

    const [homePageData, setHomePageData] = useState({
        bed: [],
        chair: [],
        pillow: [],
        sofa: [],
        all: []
    })
    const fetchHomepageData = () => {
        let data = '';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/product/get/list',
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Response **************", response.data);
                if(response?.status) {
                    let sofas = [];
                    let chair = [];
                    let bed = [];
                    let pillow = [];

                    response.data?.filter((item)=> {
                        if(item?.category === "Sofa") {
                            sofas.push(item)
                        } else if(item?.category === "Bed") {
                            bed.push(item)
                        } else if(item?.category === "Pillow") {
                            pillow.push(item)
                        } else if(item.category === "Chair") {
                            chair.push(item)
                        }
                    })

                    setHomePageData({
                        ...homePageData,
                        bed: bed,
                        chair: chair,
                        pillow: pillow,
                        sofa: sofas,
                        all: response?.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        fetchHomepageData()
    }, [])


    const handleNavigate =(name)=> {
        navigate(`/listing/${name}`)
    }

    return (
        <div className="">
            <AppWrapper>
                <div className="" style={{zIndex: '111'}}>
                    <HomeCarousal  dataList={homePageData} />
                </div>

                <div className="bg-white about-section" style={{zIndex: '111'}}>
                    <div className="pb-16">
                        <div className="flex items-center justify-center">
                            <div className="w-full px-4 py-12 2xl:mx-auto 2xl:container sm:px-6 xl:px-20 2xl:px-0">
                                <div className="flex flex-col items-center space-y-10 jusitfy-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <p className="text-xl leading-5 text-gray-600">2023 Trendsetters</p>
                                        <h1 className="text-3xl font-semibold leading-7 text-gray-800 xl:text-4xl xl:leading-9">Shop By Category</h1>
                                    </div>
                                    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8">
                                        <div className="relative flex items-center justify-center w-full h-full group">
                                            <img className="object-cover object-center w-full h-full" src="https://images.pexels.com/photos/4112558/pexels-photo-4112558.jpeg?auto=compress&cs=tinysrgb&w=1600&h=400" alt="girl-image" />
                                            <button onClick={()=> handleNavigate('Bed')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Bed</button>
                                            <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                        </div>
                                        <div className="flex flex-col mt-4 space-y-4 md:space-y-8 md:mt-0">
                                            <div className="relative flex items-center justify-center w-full h-full group">
                                                <img className="object-cover object-center w-full h-full" src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="shoe-image" />
                                                <button onClick={()=> handleNavigate('Chair')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Chair</button>
                                                <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                            </div>
                                            <div className="relative flex items-center justify-center w-full h-full group">
                                                <img className="object-cover object-center w-full h-full" src="https://images.pexels.com/photos/271696/pexels-photo-271696.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="watch-image" />
                                                <button onClick={()=> handleNavigate('Dining')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Dining</button>
                                                <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                            </div>
                                        </div>
                                        <div className="relative items-center justify-center hidden w-full h-full group lg:flex">
                                            <img className="object-cover object-center w-full h-full" src="https://images.pexels.com/photos/12742348/pexels-photo-12742348.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="girl-image" />
                                            <button onClick={()=> handleNavigate('Sofa')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Sofa</button>
                                            <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                        </div>
                                        <div className="relative flex items-center justify-center w-full h-full mt-4 group md:hidden md:mt-8 lg:hidden">
                                            <img className="hidden object-cover object-center w-full h-full md:block" src="https://images.pexels.com/photos/12742348/pexels-photo-12742348.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="girl-image" />
                                            <img className="object-cover object-center w-full h-full md:hidden" src="https://images.pexels.com/photos/12742348/pexels-photo-12742348.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2" />
                                            <button onClick={()=> handleNavigate('Sofa')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Sofa</button>
                                            <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                        </div>
                                    </div>
                                    <div className="relative items-center justify-center hidden w-full h-full mt-4 group md:flex md:mt-8 lg:hidden">
                                        <img className="hidden object-cover object-center w-full h-full md:block" src="https://images.pexels.com/photos/12742348/pexels-photo-12742348.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="girl-image" />
                                        <img className="object-cover object-center w-full h-full sm:hidden" src="https://images.pexels.com/photos/12742348/pexels-photo-12742348.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2" />
                                        <button onClick={()=> handleNavigate('Sofa')} className="absolute z-10 py-3 text-base font-medium leading-none text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 w-36">Sofa</button>
                                        <div className="absolute z-0 px-20 py-6 transition duration-500 bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 bottom-3 w-36" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-8 lg:px-20 md:px-6 md:py-12">
                    <div className="items-center justify-between lg:flex">
                        <div className="lg:w-1/3">
                            <h1 className="text-4xl font-semibold leading-9 text-gray-800">Indoor Interiors</h1>
                            <p className="mt-4 text-base leading-6 text-gray-600">Get inspired by our curated selection of luxiwood interiors. We hope get inspired to have luxiwood interior yourself. You’ll find tips here where you can buy a lot of cool furniture.</p>
                            <button aria-label="view catalogue" onClick={()=> handleNavigate('All')} className="flex items-center mt-6 text-base font-semibold leading-none text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none md:mt-8 hover:underline">
                                View Catalogue
                                <svg className="mt-1 ml-2" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.33325 4H10.6666" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 6.66667L10.6667 4" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 1.33398L10.6667 4.00065" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-8 lg:w-7/12 lg:mt-0">
                            <div className="w-full h-full bg-red-200">
                                <img src="https://i.ibb.co/cbyDY74/pexels-max-vakhtbovych-6782351-1-1.png" alt="apartment design" className="hidden w-full sm:block" />
                                <img src="https://i.ibb.co/ZVPGjGJ/pexels-max-vakhtbovych-6782351-1.png" alt="apartment design" className="block w-full sm:hidden" />
                            </div>
                            <div className="grid gap-6 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 lg:mt-8 md:mt-6">
                                <img src="https://i.ibb.co/4Jrp5TB/pexels-max-vakhtbovych-6782370-1.png" className="w-full" alt="kitchen" />
                                <img src="https://i.ibb.co/0Jv3FSy/pexels-max-vakhtbovych-6436799-1-1.png" className="w-full" alt="sitting room" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="container px-6 py-12 mx-auto xl:px-0">
                        <div className="flex flex-col">
                            <div className="flex flex-col justify-center">
                                <div className="relative">
                                    <img className="hidden w-full sm:block" src="https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png" alt="sofa" />
                                    <img className="w-full sm:hidden" src="https://i.ibb.co/B6qwqPT/jason-wang-Nx-Awry-Abt-Iw-unsplash-1.png" alt="sofa" />
                                    <div className="absolute flex items-start justify-start pr-10 sm:bottom-8 bottom-4 sm:pr-0 left-4 sm:left-8">
                                        <p className="text-3xl font-semibold leading-9 text-white sm:text-4xl">Range Comfort Sofas</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid items-center mt-10 lg:grid-cols-2 gap-x-8 gap-y-8">
                                {homePageData?.sofa?.map((item, index) => {
                                    return (
                                        <div className="relative flex items-center justify-center px-10 transition duration-500 group group-hover:bg-opacity-60 bg-gray-50 sm:p-28 py-36">
                                            <img onClick={()=> navigate(`/product/${item?._id}`) } className="transition duration-500 cursor-pointer group-hover:opacity-60" src={item?.images[0]} alt="sofa-2" />
                                            <div className="absolute flex flex-col items-start justify-start space-y-2 sm:top-8 top-4 left-4 sm:left-8">
                                                <div>
                                                    <p className="text-xl leading-5 text-gray-600 transition duration-500 group-hover:opacity-60">{item?.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xl font-semibold leading-5 text-gray-800 transition duration-500 group-hover:opacity-60">${item?.price}</p>
                                                </div>
                                            </div>
                                            <div className="absolute flex flex-row items-start justify-start space-x-2 transition duration-500 group-hover:opacity-60 bottom-8 right-8">
                                                <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                                                <button className="bg-white border rounded-full focus:bg-gray-800 border-gray-600 p-1.5" />
                                            </div>
                                            <div className="absolute flex flex-col space-y-4 transition duration-500 opacity-0 bottom-8 left-8 group-hover:opacity-100">
                                                <button title="Add to cart">
                                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z"
                                                            fill="#1F2937"
                                                        />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="#1F2937" />
                                                        <path
                                                            d="M21.8701 11.5C21.2301 10.39 17.7101 4.82001 11.7301 5.00001C6.20007 5.14001 3.00007 10 2.13007 11.5C2.0423 11.652 1.99609 11.8245 1.99609 12C1.99609 12.1755 2.0423 12.348 2.13007 12.5C2.76007 13.59 6.13007 19 12.0201 19H12.2701C17.8001 18.86 21.0101 14 21.8701 12.5C21.9578 12.348 22.004 12.1755 22.004 12C22.004 11.8245 21.9578 11.652 21.8701 11.5ZM12.0001 15.5C11.3078 15.5 10.6311 15.2947 10.0556 14.9102C9.48 14.5256 9.0314 13.9789 8.76649 13.3394C8.50158 12.6999 8.43227 11.9961 8.56732 11.3172C8.70237 10.6383 9.03571 10.0146 9.52519 9.52514C10.0147 9.03565 10.6383 8.70231 11.3173 8.56726C11.9962 8.43221 12.6999 8.50152 13.3395 8.76643C13.979 9.03134 14.5256 9.47994 14.9102 10.0555C15.2948 10.6311 15.5001 11.3078 15.5001 12C15.5001 12.9283 15.1313 13.8185 14.4749 14.4749C13.8186 15.1313 12.9283 15.5 12.0001 15.5Z"
                                                            fill="#1F2937"
                                                        />
                                                    </svg>
                                                </button>
                                                {/* <button>
                                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z"
                                                            fill="#1F2937"
                                                        />
                                                    </svg>
                                                </button> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </AppWrapper>
        </div>
    )
}

export default HomePage