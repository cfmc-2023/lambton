import { useState } from "react";
import { Link } from "react-router-dom";
const PageFooter = () => {
    const [mode, setMode] = useState("auto");
    return (
        <div className="pt-12">
            <footer id="footer" className="relative z-50 pt-24 dark:bg-gray-900">
                <div className="py-16 border-t border-b border-gray-200 dark:border-gray-700">
                    <div className="container px-4 mx-auto xl:px-12 2xl:px-4">
                        <div className="lg:flex">
                            <div className="flex w-full mb-16 lg:w-1/2 lg:mb-0">
                                <div className="w-full px-6 lg:w-1/2">
                                    <ul>
                                        <li>
                                            <Link to="/">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Home</a>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="/listing/Bed">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Bed</a>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="/listing/Sofa">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Sofa</a>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="/listing/Chair">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Chair</a>
                                            </Link>
                                        </li>
                                        {/* <li className="mt-6">
                                            <a href="javascript:void(0)" className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">
                                                Documentation
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>
                                <div className="w-full px-6 lg:w-1/2">
                                    <ul>
                                        <li>
                                            <Link to="/privacy">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Privacy</a>
                                            </Link>
                                        </li>

                                        <li className="mt-6">
                                            <Link to="conditions">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Terms and conditions</a>
                                            </Link>
                                        </li>
                                        {/* <li className="mt-6">
                                            <Link href="javascript:void(0)">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">Changelog</a>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex w-full lg:w-1/2">
                                <div className="w-full px-6 lg:w-1/2">
                                    <ul>
                                        <li>
                                            <Link to="/listing/All" className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">
                                                Trending now
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="/listing/All">
                                                <a className="text-xs leading-none text-gray-800 lg:text-sm hover:text-brand dark:hover:text-brand dark:text-gray-50">New arrival</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-3xl font-extrabold text-white">
                        CMFC
                    </div>
                    <p className="mt-6 text-xs leading-none text-gray-900 lg:text-sm dark:text-gray-50">2023 CMFC. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
export default PageFooter;
