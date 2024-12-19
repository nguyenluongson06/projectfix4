import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Badge, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartReducer';
import EventAPI from '../api/Event';
import MediaAPI from '../api/Media';
import TicketAPI from '../api/Ticket';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import './EventDetail.css';

export default function EventDetail() {
	const { eventUuid } = useParams();
	const dispatch = useDispatch();
	const [event, setEvent] = useState(null);
	const [media, setMedia] = useState([]);
	const [tickets, setTickets] = useState([]);
	const [quantity, setQuantity] = useState({});

	const carouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		adaptiveHeight: true,
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	useEffect(() => {
		EventAPI.getEventByUuid(eventUuid)
			.then((data) => setEvent(data))
			.catch((error) => console.error('Error fetching event details:', error));

		MediaAPI.getEventMedia(eventUuid)
			.then((response) => setMedia(response.data))
			.catch((error) => console.error('Error fetching event media:', error));

		TicketAPI.getTicketsOfEvent(eventUuid)
			.then((data) => {
				setTickets(data);
				const initialQuantities = {};
				data.forEach((ticket) => {
					initialQuantities[ticket.id] = 0;
				});
				setQuantity(initialQuantities);
			})
			.catch((error) => console.error('Error fetching tickets:', error));
	}, [eventUuid]);

	if (!event) {
		return <div>Loading event details...</div>;
	}

	return (
		<Container className="my-5">
			<Row className="gy-4">
				<Col md={6}>
					<div className="image-container mb-4">
						{media.length > 0 ? (
							<Swiper
								modules={[Navigation, Pagination]}
								spaceBetween={10}
								slidesPerView={1}
								navigation
								pagination={{ clickable: true }}
								className="w-full h-auto">
								{media.map((item) => (
									<SwiperSlide key={item.id} className="w-full">
										<img
											src={item.url}
											alt={`Media ${item.id}`}
											className="w-full h-auto object-cover rounded-lg"
											style={{ maxHeight: '400px', objectFit: 'cover' }}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<img
								src="https://via.placeholder.com/343x197"
								alt="Placeholder"
								className="w-full h-auto object-cover rounded-lg"
							/>
						)}
					</div>
				</Col>
				<Col md={6}>
					<div className="event-details">
						<div>
							<Badge pill className="mb-2" variant="primary">{event.categoryName}</Badge>
							<h1 className="text-3xl font-bold text-dark">{event.name}</h1>
							<div className="d-flex align-items-center gap-2 text-muted mt-2">
								<CalendarTodayIcon className="w-4 h-4" />
								<span>{formatDate(event.timeStart)}</span>
							</div>
							<div className="d-flex align-items-center gap-2 text-muted">
								<LocationOnIcon className="w-4 h-4" />
								<span>{event.place}</span>
							</div>
							<p>
								<strong>Duration:</strong> {formatDate(event.timeStart)} -{' '}
								{new Date(event.timeEnd).toLocaleTimeString()}
							</p>
							<p><strong>Max quantity:</strong> {event.maxQuantity}</p>
						</div>

						{/* Tickets Section */}
						<Card className="p-3 card-custom shadow-sm mb-4">
							<h2 className="font-medium text-center">Tickets</h2>
							{tickets.map((ticket) => (
								<div
									key={ticket.id}
									className={`p-3 rounded-lg border cursor-pointer mb-2 ${
										quantity[ticket.id] > 0 ? 'border-primary bg-light' : 'border-secondary'
									}`}>
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<h5 className="font-normal text-muted">{ticket.ticketName}</h5>
											<p className="text-muted">{ticket.ticketPosition}</p>
										</div>
										<p className="text-right text-primary">${ticket.price}</p>
									</div>
								</div>
							))}
						</Card>

						<Button
							variant="primary"
							className="w-100 mt-3"
							onClick={() => {
								dispatch(
									addToCart({
										id: event.uuid,
										title: event.name,
										tickets: tickets,
										quantities: quantity,
									})
								);
							}}>
							<AddShoppingCartIcon />
							<Link to={`/Cart/${event.uuid}`} style={{ color: 'white', textDecoration: 'none' }}>
								Buy Now
							</Link>
						</Button>

						{/* Event Description */}
						<div className="mt-4">
							<h2 className="h4 mb-3">Event Details</h2>
							<p className="text-muted">{event.description}</p>
							<p><strong>Organizer:</strong> {event.organizer.fullName}</p>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
