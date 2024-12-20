// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import StageandartWeb from "../component/Stage and art/StageandartWeb";
const Stageandart = () => {
    return (
        <div>
            <Navbar />
            <StageandartWeb/>

            <Footer />
        </div>
    );
};

export default Stageandart;
