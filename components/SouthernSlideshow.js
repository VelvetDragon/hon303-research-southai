import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/SouthernSlideshow.module.css';

const images = [
  {
    src: '/images/biscuits-gravy.jpg',
    alt: 'Southern fried chicken with biscuits',
    caption: 'Classic fried chicken and buttermilk biscuits'
  },
  {
    src: '/images/cornbread.jpg',
    alt: 'Cornbread',
    caption: 'A classic southern cornbread'
  },
  {
    src: '/images/peach-cobbler.jpg',
    alt: 'Peach cobbler',
    caption: 'Homestyle peach cobbler'
  },
  {
    src: '/images/gumbo.jpg',
    alt: 'Gumbo',
    caption: 'Creamy gumbo with shrimp and sausage'
  },
  {
    src: '/images/fried-chicken.jpg',
    alt: 'Fried chicken',
    caption: 'Crispy fried chicken with a side of mashed potatoes'
  }
];

export default function SouthernSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideshowRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize the slideshow
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  // Handle automatic slideshow advancement
  useEffect(() => {
    if (isPaused || !isInitialized) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused, isInitialized]);
  
  // Handle mouse events to pause/resume slideshow
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };
  
  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    if (!slideshowRef.current) return;
    
    const { left, top, width, height } = slideshowRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const activeSlide = slideshowRef.current.querySelector(`.${styles.active} .${styles.slideshowImage}`);
    if (activeSlide) {
      activeSlide.style.transform = `scale(1.05) translate(${x * 20}px, ${y * 20}px)`;
    }
  };

  return (
    <div 
      className={styles.slideshowContainer} 
      ref={slideshowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {images.map((image, index) => (
        <div 
          key={index}
          className={`${styles.slideshowSlide} ${index === currentImageIndex ? styles.active : ''}`}
        >
          <div className={styles.imageWrapper}>
            <Image 
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0 || index === 1}
              sizes="(max-width: 768px) 100vw, 600px"
              className={styles.slideshowImage}
            />
          </div>
          <div className={styles.caption}>
            <p>{image.caption}</p>
          </div>
        </div>
      ))}
      
      <div className={styles.slideshowDots}>
        {images.map((_, index) => (
          <button 
            key={index} 
            className={`${styles.slideshowDot} ${index === currentImageIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 