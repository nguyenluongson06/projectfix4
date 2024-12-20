// App.js
import React from 'react';

import Footer from '../component/common/footer';
import Navbar from '../component/common/navbar';
import TalkshowWeb from "../component/TalkshowWeb/TalkshowWeb";
const Talkshow = () => {
    return (
        <div>
            <Navbar />
            <TalkshowWeb/>

            <Footer />
        </div>
    );
};

export default Talkshow;
