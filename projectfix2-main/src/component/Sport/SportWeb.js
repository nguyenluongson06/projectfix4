import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventAPI from '../api/Event';

const SportWeb = () => {
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

    // CSS-in-JS styles
    const styles = {
        title: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.3rem',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #ff5722, #2196f3)', // Màu thể thao năng động
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
        },
        cardBody: {
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        loadMoreButton: {
            backgroundColor: '#2196f3',
            borderColor: '#2196f3',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease-in-out',
        },
        loadMoreButtonHover: {
            backgroundColor: '#1976d2',
        },
    };

    return (
        <div className="container my-5">
            <h2 style={styles.title}>Sports Events</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products.slice(0, visibleProducts).map((product) => (
                    <div key={product.uuid} className="col">
                        <div className="card h-100 shadow-sm product-card">
                            <img src={product.thumbnailUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body d-flex flex-column" style={styles.cardBody}>
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
                        style={styles.loadMoreButton}
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

export default SportWeb;
