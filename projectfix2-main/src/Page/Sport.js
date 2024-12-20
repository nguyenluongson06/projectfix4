// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import SportWeb from "../component/Sport/SportWeb";
const Sport = () => {
    return (
        <div>
            <Navbar />
            <SportWeb/>

            <Footer />
        </div>
    );
};

export default Sport;
