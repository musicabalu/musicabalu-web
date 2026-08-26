"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

export default function Carousel({ images, altPrefix = "Imagen de Musicabalú" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={styles.carouselContainer}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
        >
          <Image
            src={src}
            alt={`${altPrefix} ${index + 1}`}
            fill
            className={styles.image}
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Indicadores (puntitos) */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
