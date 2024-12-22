import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketItem {
	id: number;
	ticketCode: string;
	ticketName: string;
	ticketType: string;
	ticketPosition: string;
	maxQuantity: number;
	price: number;
	quantity: number; // Add quantity for cart functionality
}

interface Event {
	uuid: string;
	name: string;
	timeStart: string;
	place: string;
	categoryName: string;
	thumbnailUrl: string;
	tickets: TicketItem[];
}

interface CartState {
	ticket_list: Event[];
}

const initialState: CartState = {
	ticket_list: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Event>) => {
			const existingEvent = state.ticket_list.find(
				(event) => event.uuid === action.payload.uuid,
			);

			if (existingEvent) {
				// If the event already exists, update ticket quantities
				action.payload.tickets.forEach((newTicket) => {
					const existingTicket = existingEvent.tickets.find(
						(ticket) => ticket.id === newTicket.id,
					);

					if (existingTicket) {
						existingTicket.quantity += newTicket.quantity || 1;
					} else {
						existingEvent.tickets.push({
							...newTicket,
							quantity: newTicket.quantity || 1,
						});
					}
				});
			} else {
				// If the event doesn't exist, add it to the cart
				state.ticket_list.push({
					...action.payload,
					tickets: action.payload.tickets.map((ticket) => ({
						...ticket,
						quantity: ticket.quantity || 1,
					})),
				});
			}
		},

		incrementQuantity: (
			state,
			action: PayloadAction<{ eventUuid: string, ticketId: number }>,
		) => {
			const { eventUuid, ticketId } = action.payload;
			const event = state.ticket_list.find((event) => event.uuid === eventUuid);
			const ticket = event?.tickets.find((ticket) => ticket.id === ticketId);

			if (ticket && ticket.quantity < ticket.maxQuantity) {
				ticket.quantity += 1;
			}
		},

		decrementQuantity: (
			state,
			action: PayloadAction<{ eventUuid: string, ticketId: number }>,
		) => {
			const { eventUuid, ticketId } = action.payload;
			const event = state.ticket_list.find((event) => event.uuid === eventUuid);
			const ticket = event?.tickets.find((ticket) => ticket.id === ticketId);

			if (ticket && ticket.quantity > 1) {
				ticket.quantity -= 1;
			} else if (ticket && ticket.quantity === 1) {
				// Remove the ticket if its quantity is 1
				event.tickets = event.tickets.filter((t) => t.id !== ticketId);

				// If no tickets are left for the event, remove the event
				if (event.tickets.length === 0) {
					state.ticket_list = state.ticket_list.filter(
						(e) => e.uuid !== eventUuid,
					);
				}
			}
		},

		removeItem: (
			state,
			action: PayloadAction<{ eventUuid: string, ticketId: number }>,
		) => {
			const { eventUuid, ticketId } = action.payload;
			const event = state.ticket_list.find((event) => event.uuid === eventUuid);

			if (event) {
				event.tickets = event.tickets.filter(
					(ticket) => ticket.id !== ticketId,
				);

				// If no tickets are left for the event, remove the event
				if (event.tickets.length === 0) {
					state.ticket_list = state.ticket_list.filter(
						(e) => e.uuid !== eventUuid,
					);
				}
			}
		},

		resetCart: (state) => {
			state.ticket_list = [];
		},

		calculateTotalPrice: (state) => {
			const cart = state.cart;
			const items = cart.ticket_list;

			// Calculate total price dynamically
			return items.reduce((total, event) => {
				return (
					total +
					event.tickets.reduce((eventTotal, ticket) => {
						const quantity = ticket.quantity || 0;
						return eventTotal + quantity * ticket.price;
					}, 0)
				);
			}, 0);
		},
	},
});

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeItem,
	resetCart,
	calculateTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
