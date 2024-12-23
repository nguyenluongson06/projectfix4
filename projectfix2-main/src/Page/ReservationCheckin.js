import React from 'react';
import Navbar from '../component/common/navbar';

import Footer from '../component/common/footer';
import ReservationCheckIn from '../component/ReservationCheckin/ReservationCheckin';

const Checkin = () => {
	return (
		<div>
			<Navbar />
			<ReservationCheckIn />
			<Footer />
		</div>
	);
};

export default Checkin;
