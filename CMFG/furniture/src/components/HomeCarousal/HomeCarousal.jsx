/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles } from '@mui/styles';
import React from 'react'


import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    backgroundImage: {
        backgroundPosition: "center",
        height: "551px",
    }
  });

const HomeCarousal = ({ dataItem, dataList }) => {
    const classes = useStyles();

    console.log('dataItem', dataItem);
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center w-full h-full px-4 py-24 sm:py-8">
                {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="hidden lg:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}>
                    <div className="relative flex items-center justify-center w-full">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute left-0 z-30 ml-8 cursor-pointer focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="flex items-center justify-start h-full transition duration-700 ease-out lg:gap-8 md:gap-6 gap-14">
                                    {dataList?.all?.map((item, index) => {
                                        return (
                                            <Slide index={index}>
                                                <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                                                    <img src={item.images[0]} alt="black chair and white table" className="object-cover object-center w-full h-[500px]" />
                                                    <div className="absolute w-full h-full p-6 bg-gray-800 bg-opacity-30">
                                                        <h2 className="text-base leading-4 text-white lg:text-xl lg:leading-5">{item?.category}</h2>
                                                        <div className="flex items-end h-full pb-6">
                                                            <h5 className="text-xl font-semibold leading-5 text-white cursor-pointer lg:text-2xl lg:leading-6">
                                                                <Link to={`/listing/${item?.category}`}>{item.name}</Link>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute right-0 z-30 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="hidden lg:hidden md:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}>
                    <div className="relative flex items-center justify-center w-full">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute left-0 z-30 ml-8 cursor-pointer focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="flex items-center justify-start h-full transition duration-700 ease-out lg:gap-8 md:gap-6 gap-14">
                                    {dataList?.all?.map((item, index) => {
                                        return (
                                            <Slide index={index}>
                                                <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                                                    <img src={item?.images[0]} alt="black chair and white table" className="object-cover object-center w-full" />
                                                    <div className="absolute w-full h-full p-6 bg-gray-800 bg-opacity-30">
                                                        <h2 className="text-base leading-4 text-white lg:text-xl lg:leading-5">{item.category}</h2>
                                                        <div className="flex items-end h-full pb-6">
                                                            <h5 className="text-xl font-semibold leading-5 text-white cursor-pointer lg:text-2xl lg:leading-6">
                                                                <Link to={`/listing/${item?.category}`}>{item.name}</Link>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}

                                    
                                    
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute right-0 z-30 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true}>
                    <div className="relative flex items-center justify-center w-full">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute left-0 z-30 ml-8 cursor-pointer focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="flex items-center justify-start w-full h-full transition duration-700 ease-out lg:gap-8 md:gap-6">
                                    {dataList?.all?.map((item, index) => {
                                        return (
                                            <Slide index={index}>
                                                <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                                                    <img src={item?.images[0]} alt="black chair and white table" className="object-cover object-center w-full" />
                                                    <div className="absolute w-full h-full p-6 bg-gray-800 bg-opacity-30">
                                                        <h2 className="text-base leading-4 text-white lg:text-xl lg:leading-5">{item?.category}</h2>
                                                        <div className="flex items-end h-full pb-6">
                                                            <h5 className="text-xl font-semibold leading-5 text-white cursor-pointer lg:text-2xl lg:leading-6">
                                                                <Link to={`/listing/${item?.category}`}>{item.name}</Link>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                    
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute right-0 z-30 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        </div>
    )
}

export default HomeCarousal