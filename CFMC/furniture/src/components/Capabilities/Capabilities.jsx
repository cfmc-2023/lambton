/* eslint-disable array-callback-return */
import React from 'react'
import Card from '../Comman/Card'
import Grid from '@mui/material/Grid';

import img1 from '../../assets//img/1.jpg'
import img2 from '../../assets/img/2.jpg'
import img3 from '../../assets/img/3.jpg'
import img4 from '../../assets/img/4.jpg'

const capabilitiesList = [
    {
        id: 1,
        title: "Create meaningful business changes with data analytics.",
        img: img1,
    },
    {
        id: 2,
        title: "Modernize your Technology Infrastructure",
        img: img2,
    },
    {
        id: 3,
        title: "Accelerate Software Application Delivery / Life Cycle",
        img: img3,
    },
    {
        id: 4,
        title: "Unleash the power of Hybrid-Cloud.",
        img: img4,
    }
]

const Capabilities = () => {
    return (
        <div className='container-wrapper'>
            <div className="pb-6 text-3xl font-bold text-center text-black">
                New arrival
            </div>
            <div className="flex mt-8 container-row">
                <Grid xs={8}>
                    <Grid xs={8} sm={12}>
                        <Card item={capabilitiesList[0]} index={capabilitiesList[0].id} />
                    </Grid>
                    <Grid xs={8} sm={12}>
                        <Card item={capabilitiesList[1]} index={capabilitiesList[1].id} />
                    </Grid>
                </Grid>
                <Grid xs={8}>
                    <Grid xs={8} sm={12}>
                        <Card item={capabilitiesList[2]} index={capabilitiesList[2].id} />
                    </Grid>
                    <Grid xs={8} sm={12}>
                        <Card item={capabilitiesList[3]} index={capabilitiesList[3].id} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Capabilities