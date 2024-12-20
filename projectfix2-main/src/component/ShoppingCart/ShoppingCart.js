import React, { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Divider,
} from "@mui/material";
import { MockData } from "../Eventdetail/MockData";
import { addToCart, incrementQuantity, decrementQuantity } from "../Eventdetail/CartReducer";
import { setTotalPrice } from "../Checkout/Action";
import { Link } from "react-router-dom";

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

    const calculateTotalPrice = () => {
        return event.ticket_info.reduce(
            (total, ticket) => total + ticket.price * quantity[ticket.id],
            0
        );
    };

    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        dispatch(setTotalPrice(totalPrice));
    }, [quantity, dispatch]);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <Card>
                <CardContent>
                    <Chip label={event.category} color="primary" />
                    <Typography variant="h4" gutterBottom>
                        {event.name}
                    </Typography>
                    <img
                        src={event.media[0].url}
                        alt={event.name}
                        style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
                    />
                    <Typography variant="body2" color="textSecondary">
                        {new Date(event.time_start).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {event.place}
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <Typography variant="h5" gutterBottom>
                        Select Ticket Type
                    </Typography>
                    {event.ticket_info.map((ticket) => (
                        <div
                            key={ticket.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                                padding: "10px",
                                border: `1px solid ${quantity[ticket.id] > 0 ? "#3f51b5" : "#ddd"}`,
                                borderRadius: "8px",
                            }}
                        >
                            <div>
                                <Typography variant="subtitle1">{ticket.ticket_name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {ticket.ticket_position}
                                </Typography>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button
                                    size="small"
                                    color="primary"
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
                                >
                                    -
                                </Button>
                                <Typography variant="body1" style={{ margin: "0 10px" }}>
                                    {quantity[ticket.id]}
                                </Typography>
                                <Button
                                    size="small"
                                    color="primary"
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
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardActions>
                    <Typography variant="h6">
                        Total Price: ${calculateTotalPrice()}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "auto" }}
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
                        <AddShoppingCartIcon style={{ marginRight: "8px" }} />
                        <Link to="/Checkout" style={{ color: "white", textDecoration: "none" }}>
                            Check Out
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
