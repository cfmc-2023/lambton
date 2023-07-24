import React from 'react'
import AboutCard from './AboutCard/AboutCard'

import img1 from '../../assets//img/1.jpg'
import img2 from '../../assets/img/2.jpg'
import img3 from '../../assets/img/3.jpg'


const capabilitiesList = [
  {
    id: 1,
    title: "Values",
    img: img1,
    desc: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
  },
  {
    id: 2,
    title: "Culture",
    img: img2,
    desc: "Here are the biggest technology."
  },
  {
    id: 3,
    title: "Mission",
    img: img3,
    desc: "Here are the biggest technology."
  }
]

const AboutUs = () => {
  return (
    <div className='container-wrapper' >
      <div className="pb-6 text-3xl font-bold text-center text-black">
        Trending
      </div>
      <div className="flex mt-8 container-row">
          <div className="w-full p-4 md:w-3/4 left-images">
            <AboutCard small={false} item={capabilitiesList[0]} index={capabilitiesList[0].id} />
          </div>
          <div className="w-full p-4 md:w-1/2 right-images">
            <div className="mb-3">
              <AboutCard small={true} item={capabilitiesList[1]} index={capabilitiesList[1].id} />
            </div>
            <div>
              <AboutCard small={true} item={capabilitiesList[2]} index={capabilitiesList[2].id} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default AboutUs