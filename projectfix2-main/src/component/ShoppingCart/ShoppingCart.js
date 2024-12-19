'use client'

import React, { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Card, Badge } from 'react-bootstrap';
import { MockData } from '../Eventdetail/MockData';
import { addToCart, incrementQuantity, decrementQuantity } from "../Eventdetail/CartReducer";
import { setTotalPrice } from "../Checkout/Action";
import {Link} from 'react-router-dom';

export default function ShoppingCart() {
    const id = useParams().id;
    const [quantity, setQuantity] = useState(() => {
        const initialQuantities = {};
        MockData.ticket_info.forEach((ticket) => {
            initialQuantities[ticket.id] = 0;
        });
        return initialQuantities;
    });

    const dispatch = useDispatch();

    const event = MockData;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateTotalPrice = () => {
        return event.ticket_info.reduce((total, ticket) => total + (ticket.price * quantity[ticket.id]), 0);
    };

    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        dispatch(setTotalPrice(totalPrice));
    }, [quantity, dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <Badge className="mb-2 bg-primary text-white">{event.category}</Badge>
                        <h1 className="text-3xl font-semibold text-gray-800">{event.name}</h1>
                        <div className="image-container">
                            <img src={event.media[0].url} alt={event.name} className="rounded-lg shadow-lg" />
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                            <span>{formatDate(event.time_start)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>{event.place}</span>
                        </div>
                    </div>

                    <Card className="p-4 shadow-lg rounded-lg">
                        <div className="space-y-4">
                            <h2 className="font-semibold text-xl">Select Ticket Type</h2>
                            <div className="space-y-2">
                                {event.ticket_info.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ease-in-out 
                                            ${quantity[ticket.id] > 0 ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-lg">{ticket.ticket_name}</h3>
                                                <p className="text-sm text-gray-500">{ticket.ticket_position}</p>
                                            </div>
                                            <p className="font-semibold">${ticket.price}</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="ms-auto flex items-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (quantity[ticket.id] > 0) {
                                                            setQuantity((prev) => ({
                                                                ...prev,
                                                                [ticket.id]: prev[ticket.id] - 1,
                                                            }));
                                                            dispatch(decrementQuantity({ ticketType: ticket.ticket_name, id: ticket.id }));
                                                        }
                                                    }}
                                                    disabled={quantity[ticket.id] === 0}
                                                    className="transition-all duration-200 ease-in-out"
                                                >
                                                    -
                                                </Button>
                                                <span className="w-8 text-center">{quantity[ticket.id]}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (quantity[ticket.id] < ticket.max_quantity) {
                                                            setQuantity((prev) => ({
                                                                ...prev,
                                                                [ticket.id]: prev[ticket.id] + 1,
                                                            }));
                                                            dispatch(incrementQuantity({ ticketType: ticket.ticket_name, id: ticket.id }));
                                                        }
                                                    }}
                                                    disabled={quantity[ticket.id] === ticket.max_quantity}
                                                    className="transition-all duration-200 ease-in-out"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-xl">Total Price: ${calculateTotalPrice()}</h4>
                                    </div>
                                    <Button
                                        className="w-full bg-primary text-white hover:bg-primary-dark transition-all duration-200"
                                        onClick={() => {
                                            dispatch(
                                                addToCart({
                                                    id: event.id,
                                                    title: event.name,
                                                    tickets: event.ticket_info,
                                                    quantities: quantity,
                                                })
                                            );
                                        }}
                                    >
                                        <AddShoppingCartIcon className="mr-2 h-4 w-4" />
                                        <Link to="/Checkout" style={{ color: 'white', textDecoration: 'none' }}>
                                            Check Out
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
