import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	Chip,
	Divider,
	Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { incrementQuantity, decrementQuantity } from '../Eventdetail/CartReducer';
import { Link } from 'react-router-dom';

// Custom styling
const GradientButton = styled(Button)({
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	borderRadius: '8px',
	color: 'white',
	padding: '6px 16px',
	textTransform: 'none',
	boxShadow: '0px 3px 5px 2px rgba(255, 105, 135, .3)',
});

const TicketCard = styled('div')(({ theme, active }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '15px',
	marginBottom: '10px',
	border: active ? '2px solid #FF8E53' : '1px solid #ddd',
	borderRadius: '10px',
	backgroundColor: active ? 'rgba(255, 142, 83, 0.1)' : '#fff',
	transition: 'all 0.3s ease',
	':hover': {
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
	},
}));

export default function ShoppingCart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const items = cart.ticket_list;

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

	return (
		<div
			style={{
				maxWidth: '900px',
				margin: '0 auto',
				padding: '20px',
				fontFamily: "'Roboto', sans-serif",
			}}>
			<Card>
				<CardContent>
					{items.map((event) => (
						<div key={event.uuid}>
							<Chip label={event.categoryName} color='primary' />
							<Typography
								variant='h3'
								gutterBottom
								style={{ fontWeight: 'bold' }}>
								{event.name}
							</Typography>
							<img
								src={
									event.thumbnailUrl || 'https://via.placeholder.com/343x197'
								}
								alt={event.name}
								style={{
									width: '100%',
									borderRadius: '10px',
									marginBottom: '20px',
								}}
							/>
							<Typography variant='body2' color='textSecondary'>
								{new Date(event.timeStart).toLocaleString()}
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								{event.place}
							</Typography>
							<Divider style={{ margin: '20px 0' }} />
							<Typography variant='h5' gutterBottom>
								Tickets
							</Typography>
							<Grid container spacing={2}>
								{event.tickets.map((ticket) => (
									<Grid item xs={12} key={ticket.id}>
										<TicketCard active={ticket.quantity > 0}>
											<div>
												<Typography
													variant='subtitle1'
													style={{ fontWeight: 'bold' }}>
													{ticket.ticketName}
												</Typography>
												<Typography variant='body2' color='textSecondary'>
													{ticket.ticketPosition}
												</Typography>
											</div>
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Button
													size='small'
													color='secondary'
													onClick={() =>
														dispatch(
															decrementQuantity({
																eventUuid: event.uuid,
																ticketId: ticket.id,
															}),
														)
													}
													disabled={ticket.quantity === 0}>
													-
												</Button>
												<Typography
													variant='body1'
													style={{ margin: '0 10px' }}>
													{ticket.quantity}
												</Typography>
												<Button
													size='small'
													color='primary'
													onClick={() =>
														dispatch(
															incrementQuantity({
																eventUuid: event.uuid,
																ticketId: ticket.id,
															}),
														)
													}
													disabled={ticket.quantity === ticket.maxQuantity}>
													+
												</Button>
											</div>
										</TicketCard>
									</Grid>
								))}
							</Grid>
						</div>
					))}
				</CardContent>
				<CardActions style={{ justifyContent: 'space-between' }}>
					<Typography variant='h6' style={{ fontWeight: 'bold' }}>
						Total Price: ${totalPrice.toFixed(2)}
					</Typography>
					<GradientButton>
						<AddShoppingCartIcon style={{ marginRight: '8px' }} />
						<Link
							to='/Checkout'
							style={{ color: 'white', textDecoration: 'none' }}>
							Proceed to Checkout
						</Link>
					</GradientButton>
				</CardActions>
			</Card>
		</div>
	);
}
