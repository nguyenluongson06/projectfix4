import React, { useContext } from 'react';
import './Checkout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useSelector } from 'react-redux';

const Checkout = () => {
	const { user } = useContext(UserContext); // Access user info from global state
	const cart = useSelector((state) => state.cart); // Access the cart state
	const items = cart.ticket_list;

	const navigate = useNavigate(); // Navigation hook

	// Calculate total price dynamically
	const totalPrice = items.reduce((total, event) => {
		return (
			total +
			event.tickets.reduce((eventTotal, ticket) => {
				const quantity = ticket.quantity || 0;
				return eventTotal + quantity * ticket.price;
			}, 0)
		);
	}, 0);

	const handleCheckout = () => {
		// Redirect to "Reservation is being processed" page
		navigate('/reservation-processing');
	};

	return (
		<div className='maincontainer'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8 order-md-1'>
						<h4 className='mb-3'>Billing address</h4>
						<form className='needs-validation' noValidate>
							<div className='row'>
								<div className='mb-3'>
									<label htmlFor='fullName'>Full name</label>
									<input
										type='text'
										className='form-control'
										id='fullName'
										placeholder=''
										defaultValue={user?.fullName || ''} // Pre-fill with user info
										required
									/>
									<div className='invalid-feedback'>
										Valid full name is required.
									</div>
								</div>
							</div>

							<div className='mb-3'>
								<label htmlFor='username'>Username</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>@</span>
									</div>
									<input
										type='text'
										className='form-control'
										id='username'
										placeholder='Username'
										defaultValue={user?.username || ''} // Pre-fill with user info
										required
									/>
									<div className='invalid-feedback'>
										Your username is required.
									</div>
								</div>
							</div>

							<div className='mb-3'>
								<label htmlFor='email'>Email</label>
								<input
									type='email'
									className='form-control'
									id='email'
									placeholder='you@example.com'
									defaultValue={user?.email || ''} // Pre-fill with user info
									required
								/>
								<div className='invalid-feedback'>
									Please enter a valid email address.
								</div>
							</div>

							<div className='mb-3'>
								<label htmlFor='address'>Address</label>
								<input
									type='text'
									className='form-control'
									id='address'
									placeholder='1234 Main St'
									defaultValue={user?.address || ''} // Pre-fill with user info
									required
								/>
								<div className='invalid-feedback'>
									Please enter your shipping address.
								</div>
							</div>

							<div className='row'>
								<div className='col-md-5 mb-3'>
									<label htmlFor='country'>Country</label>
									<select
										className='custom-select d-block w-100'
										id='country'
										required>
										<option value=''>Choose...</option>
										<option>United States</option>
									</select>
									<div className='invalid-feedback'>
										Please select a valid country.
									</div>
								</div>
								<div className='col-md-4 mb-3'>
									<label htmlFor='state'>State</label>
									<select
										className='custom-select d-block w-100'
										id='state'
										required>
										<option value=''>Choose...</option>
										<option>California</option>
									</select>
									<div className='invalid-feedback'>
										Please provide a valid state.
									</div>
								</div>
								<div className='col-md-3 mb-3'>
									<label htmlFor='zip'>Zip</label>
									<input
										type='text'
										className='form-control'
										id='zip'
										placeholder=''
										required
									/>
									<div className='invalid-feedback'>Zip code required.</div>
								</div>
							</div>

							<hr className='mb-4' />

							<div>
								<h2>Total: ${totalPrice.toFixed(2)}</h2>
							</div>

							<hr className='mb-4' />
							<button
								className='btn btn-primary btn-lg btn-block'
								type='button'
								onClick={handleCheckout}>
								Continue to checkout
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
