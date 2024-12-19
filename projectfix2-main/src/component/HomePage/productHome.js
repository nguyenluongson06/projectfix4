import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventAPI from '../api/Event.js';
import './HomePage.css'; // We'll create this file for custom styles

const ProductHome = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const result = await EventAPI.getEventList();

        setProducts((prevProducts) => {
            const existingUuids = new Set(prevProducts.map((p) => p.uuid));

            const newProducts = result
                .filter((p) => !existingUuids.has(p.uuid))
                .map((event) => {
                    const timeStart = new Date(event.timeStart);
                    return {
                        ...event,
                        parsedMonth: timeStart.toLocaleString('en-US', { month: 'short' }),
                        parsedDay: timeStart.getDate(),
                    };
                });
            return [...prevProducts, ...newProducts];
        });
        setIsLoading(false);
    };

    const handleLoadMore = () => {
        setVisibleProducts((prevVisible) => prevVisible + 6);
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5 display-4">Upcoming Events</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products.slice(0, visibleProducts).map((product) => (
                    <div key={product.uuid} className="col">
                        <div className="card h-100 shadow-sm product-card">
                            <img src={product.thumbnailUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <div className="event-date">
                                        <span className="day">{product.parsedDay ?? '1'}</span>
                                        <span className="month">{product.parsedMonth ?? 'APR'}</span>
                                    </div>
                                    <Link to={`/events/${product.uuid}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleProducts < products.length && (
                <div className="text-center mt-5">
                    <button
                        className="btn btn-outline-primary btn-lg load-more-btn"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductHome;
