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
    Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { MockData } from "../Eventdetail/MockData";
import {
    addToCart,
    incrementQuantity,
    decrementQuantity,
} from "../Eventdetail/CartReducer";
import { setTotalPrice } from "../Checkout/Action";
import { Link } from "react-router-dom";

// Custom styling
const GradientButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "8px",
    color: "white",
    padding: "6px 16px",
    textTransform: "none",
    boxShadow: "0px 3px 5px 2px rgba(255, 105, 135, .3)",
});

const TicketCard = styled("div")(({ theme, active }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    border: active ? "2px solid #FF8E53" : "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: active ? "rgba(255, 142, 83, 0.1)" : "#fff",
    transition: "all 0.3s ease",
    ":hover": {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
}));

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
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "20px",
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <Card>
                <CardContent>
                    <Chip label={event.category} color="primary" />
                    <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
                        {event.name}
                    </Typography>
                    <img
                        src={event.media[0].url}
                        alt={event.name}
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            marginBottom: "20px",
                        }}
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
                    <Grid container spacing={2}>
                        {event.ticket_info.map((ticket) => (
                            <Grid item xs={12} key={ticket.id}>
                                <TicketCard active={quantity[ticket.id] > 0}>
                                    <div>
                                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                            {ticket.ticket_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {ticket.ticket_position}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={() => {
                                                if (quantity[ticket.id] > 0) {
                                                    setQuantity((prev) => ({
                                                        ...prev,
                                                        [ticket.id]: prev[ticket.id] - 1,
                                                    }));
                                                    dispatch(
                                                        decrementQuantity({
                                                            ticketType: ticket.ticket_name,
                                                            id: ticket.id,
                                                        })
                                                    );
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
                                                    dispatch(
                                                        incrementQuantity({
                                                            ticketType: ticket.ticket_name,
                                                            id: ticket.id,
                                                        })
                                                    );
                                                }
                                            }}
                                            disabled={quantity[ticket.id] === ticket.max_quantity}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </TicketCard>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Total Price: ${calculateTotalPrice()}
                    </Typography>
                    <GradientButton
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
                        <Link
                            to="/Checkout"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Check Out
                        </Link>
                    </GradientButton>
                </CardActions>
            </Card>
        </div>
    );
}
