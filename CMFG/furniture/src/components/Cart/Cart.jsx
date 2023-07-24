import React from "react";
import axios from 'axios';
import { useStripe } from "@stripe/react-stripe-js";

const Cart =({show, setShow, cartDetails, refetchCart})=> {
    const stripe = useStripe();
    console.log("cartDetails *************", cartDetails)

    const totalSum = cartDetails?.orders?.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject?.product.price);
      }, 0);

      const removeFromCart =(proId)=> {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/order/${proId}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            // data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            refetchCart()
          })
          .catch((error) => {
            console.log(error);
          });
      }


      const buyNowHandler= async()=> {
        let data = {
            "quantity": 1,
            "productId": cartDetails?.orders,
            "product": cartDetails?.orders[0],
            "userId": {}
          };
        
          const response = await fetch('http://localhost:4000/product/create-checkout-session', {
            method: 'POST',
            data: data
          });
          const session = await response.json();

          console.log("session ***************", session)
      
          if (session) {
              setShow(!show)
          }
          const result = await stripe.redirectToCheckout({
              sessionId: session.id,
          });

          if (result.error) {
              console.error(result.error.message);
          }
    }

    return (
        <>
            <div>
                {show && (
                    <div className="fixed top-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-90 sticky-0" id="chec-div" style={{ zIndex: 99999}}>
                        <div className="absolute right-0 z-10 w-full h-full overflow-x-hidden transition duration-700 ease-in-out transform translate-x-0" id="checkout">
                            <div className="flex flex-col justify-end md:flex-row" id="cart">
                                <div className="w-full h-screen py-8 pl-4 pr-10 overflow-x-hidden overflow-y-auto bg-white lg:w-1/2 md:pl-10 md:pr-4 md:py-12" id="scroll">
                                    <div className="flex items-center mb-4 text-gray-500 cursor-pointer hover:text-gray-600" onClick={() => setShow(!show)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="pl-2 mb-0 text-sm leading-none">Back</p>
                                    </div>
                                    <p className="pt-3 text-5xl font-black leading-10 text-gray-800">Bag</p>
                                    {cartDetails?.orders?.map((item, index) => {
                                        return (
                                            <div className="items-center py-8 border-t border-gray-200 md:flex mt-14">
                                                <div className="w-1/4">
                                                    <img src={item?.product?.images?.length > 0 ? item?.product?.images[0] : ""} alt="..." className="object-cover object-center w-full h-full" />
                                                </div>
                                                <div className="md:pl-3 md:w-3/4">
                                                    <p className="pt-4 text-xs leading-3 text-gray-800 md:pt-0">{item?.product?._id}</p>
                                                    <div className="flex items-center justify-between w-full pt-1">
                                                        <p className="text-base font-black leading-none text-gray-800">{item?.product?.brand}</p>
                                                        <select className="px-1 py-2 mr-6 border border-gray-200 focus:outline-none">
                                                            <option>01</option>
                                                            {/* <option>02</option>
                                                            <option>03</option> */}
                                                        </select>
                                                    </div>
                                                    <p className="pt-2 text-xs leading-3 text-gray-600">Height: 10 inches</p>
                                                    <p className="py-4 text-xs leading-3 text-gray-600">Color: {item?.product?.color}</p>
                                                    <p className="text-xs leading-3 text-gray-600 w-96">Composition: {item?.product?.description}</p>
                                                    <div className="flex items-center justify-between pt-5 pr-6">
                                                        <div className="flex itemms-center">
                                                            {/* <p className="text-xs leading-3 text-gray-800 underline cursor-pointer">Add to favorites</p> */}
                                                            <p onClick={()=>removeFromCart(item?._id)} className="pl-5 text-xs leading-3 text-red-500 underline cursor-pointer">Remove</p>
                                                        </div>
                                                        <p className="text-base font-black leading-none text-gray-800">${item?.product?.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                   
                                </div>
                                <div className="w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3 xl:w-1/4">
                                    <div className="flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                <p className="text-base leading-none text-gray-800">${totalSum.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Shipping</p>
                                                <p className="text-base leading-none text-gray-800">$30</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Tax</p>
                                                <p className="text-base leading-none text-gray-800">$35</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between pt-20 pb-6 lg:pt-5">
                                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">${totalSum + Number(30) + Number(35)}</p>
                                            </div>
                                            <button onClick={() => {
                                                buyNowHandler()
                                                }} className="w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>
                {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
            </style>
        </>
    );
}

export default Cart;
