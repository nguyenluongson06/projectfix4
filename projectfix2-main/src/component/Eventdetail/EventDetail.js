import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Badge, Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartReducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAPI from '../api/Event';
import MediaAPI from '../api/Media';
import TicketAPI from '../api/Ticket';
import './EventDetail.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function EventDetail() {
	const { eventUuid } = useParams();
	const dispatch = useDispatch();
	const [event, setEvent] = useState(null);
	const [media, setMedia] = useState([]);
	const [tickets, setTickets] = useState([]);
	const [quantity, setQuantity] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const eventData = await EventAPI.getEventByUuid(eventUuid);
				setEvent(eventData);

				const mediaData = await MediaAPI.getEventMedia(eventUuid);
				setMedia(mediaData.data);

				const ticketData = await TicketAPI.getTicketsOfEvent(eventUuid);
				setTickets(ticketData);

				const initialQuantities = ticketData.reduce((acc, ticket) => {
					acc[ticket.id] = 0;
					return acc;
				}, {});
				setQuantity(initialQuantities);
			} catch (error) {
				console.error('Error fetching event data:', error);
			}
		};

		fetchData();
	}, [eventUuid]);

	if (!event) return <div>Loading event details...</div>;

	const formatDate = (dateString) =>
		new Date(dateString).toLocaleString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});

	return (
		<Container className='event-detail-container my-5'>
			<Row className='gy-4'>
				<Col md={6}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={10}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}>
						{media.map((item) => (
							<SwiperSlide key={item.id}>
								<img
									src={item.url}
									alt={`Media ${item.id}`}
									className='w-100 rounded-lg'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</Col>
				<Col md={6}>
					<h1>{event.name}</h1>
					<Badge pill bg='primary' className='mb-2'>
						{event.categoryName}
					</Badge>
					<p>
						<CalendarTodayIcon /> {formatDate(event.timeStart)}
					</p>
					<p>
						<LocationOnIcon /> {event.place}
					</p>
					<p>
						<strong>Max Participants:</strong> {event.maxQuantity}
					</p>
					<h3>Tickets</h3>
					{tickets.map((ticket) => (
						<Card key={ticket.id} className='ticket-card mb-3'>
							<Card.Body className='d-flex justify-content-between align-items-center'>
								<div>
									<h5>{ticket.ticketName}</h5>
									<p>{ticket.ticketPosition}</p>
								</div>
								<div className='d-flex align-items-center'>
									<Button
										variant='outline-secondary'
										size='sm'
										onClick={() =>
											setQuantity((prev) => ({
												...prev,
												[ticket.id]: Math.max((prev[ticket.id] || 0) - 1, 0),
											}))
										}>
										-
									</Button>
									<span className='mx-2'>{quantity[ticket.id] || 0}</span>
									<Button
										variant='outline-secondary'
										size='sm'
										onClick={() =>
											setQuantity((prev) => ({
												...prev,
												[ticket.id]: Math.min(
													(prev[ticket.id] || 0) + 1,
													ticket.maxQuantity,
												),
											}))
										}>
										+
									</Button>
								</div>
								<p className='text-primary mb-0 ms-3'>${ticket.price}</p>
							</Card.Body>
						</Card>
					))}
					<Button
						className='w-full'
						onClick={() => {
							dispatch(
								addToCart({
									uuid: event.uuid,
									name: event.name,
									timeStart: event.timeStart,
									place: event.place,
									categoryName: event.categoryName,
									thumbnailUrl: event.thumbnailUrl,
									tickets: tickets.map((ticket) => ({
										...ticket,
										quantity: quantity[ticket.id] || 1, // Ensure quantity is at least 1
									})),
								}),
							);
						}}>
						<AddShoppingCartIcon className='mr-2 h-4 w-4' />
						Add to cart
					</Button>
					{/* Thêm phần mô tả dưới nút Buy Now */}
					<div className='event-description mt-4'>
						<h3>Description</h3>
						<p>{event.description}</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
