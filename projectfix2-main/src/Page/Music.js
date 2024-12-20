// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import MusicWeb from '../component/Musicweb/MusicWeb';
const Music = () => {
    return (
        <div>
            <Navbar />
            <MusicWeb/>

            <Footer />
        </div>
    );
};

export default Music;
