import React from 'react';
import Navbar from '../component/common/navbar';

import Footer from '../component/common/footer';
import ReservationProcess from '../component/ReservationProcess/ReservationProcess';

const Reservation = () => {
	return (
		<div>
			<Navbar />
			<ReservationProcess />
			<Footer />
		</div>
	);
};

export default Reservation;
