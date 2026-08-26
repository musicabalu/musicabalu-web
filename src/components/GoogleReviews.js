"use client";
import React, { useRef, useEffect } from 'react';
import styles from './GoogleReviews.module.css';

const GoogleReviews = ({ reviews, variant = 'grid' }) => {
  const renderCard = (review, index, isSlider = false) => (
    <div key={index} className={`${styles.card} ${isSlider ? styles.sliderCard : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>{review.author.charAt(0).toUpperCase()}</div>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{review.author}</span>
          <span className={styles.time}>{review.time}</span>
        </div>
      </div>
      <div className={styles.cardStars}>★★★★★</div>
      <p className={styles.text}>"{review.text}"</p>
    </div>
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    if (variant !== 'slider') return;
    
    // Auto-advance every 5 seconds
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If we reached the end, go back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by one card width approximately (320px + gap)
          scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [variant]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.googleLogo}>
            <span style={{color: '#4285F4'}}>G</span>
            <span style={{color: '#EA4335'}}>o</span>
            <span style={{color: '#FBBC05'}}>o</span>
            <span style={{color: '#4285F4'}}>g</span>
            <span style={{color: '#34A853'}}>l</span>
            <span style={{color: '#EA4335'}}>e</span>
          </span>
          <span className={styles.titleText}>Lo que dicen las familias</span>
        </h3>
        <div className={styles.overallRating}>
          <span className={styles.ratingNumber}>5.0</span>
          <span className={styles.stars}>★★★★★</span>
        </div>
      </div>
      {variant === 'slider' ? (
        <div className={styles.sliderContainer}>
          <div className={styles.sliderNative} ref={scrollRef}>
            {reviews.map((review, index) => renderCard(review, index, true))}
          </div>
          <div className={styles.controls}>
            <button onClick={scrollLeft} className={styles.controlButton} aria-label="Anterior reseña">
              &#8592;
            </button>
            <button onClick={scrollRight} className={styles.controlButton} aria-label="Siguiente reseña">
              &#8594;
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {reviews.map((review, index) => renderCard(review, index, false))}
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
