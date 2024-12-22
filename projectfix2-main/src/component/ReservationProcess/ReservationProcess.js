import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationAPI from '../api/Reservation';
import { useSelector, useDispatch } from 'react-redux';

export default function ReservationProcess() {
	return (
		<div>
			<div>Reservations are being processed...</div>
			<div>Please check your email.</div>
		</div>
	);
}
