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
  },
  {
    src: '/images/shrimp-grits.jpg',
    alt: 'Fried chicken',
    caption: 'Crispy fried chicken with a side of mashed potatoes'
  },
  {
    src: '/images/pecan_pie.jpg',
    alt: 'Fried chicken',
    caption: 'Crispy fried chicken with a side of mashed potatoes'
  },
  {
    src: '/images/collard_greens.jpg',
    alt: 'Fried chicken',
    caption: 'Crispy fried chicken with a side of mashed potatoes'
  }
];

export default function SouthernSlideshow({ isBackgroundMode = false }) {
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
    // Only pause based on mouse interaction or if not initialized
    if (isPaused || !isInitialized) return; 
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Keep faster interval
    
    return () => clearInterval(interval);
  // Remove isBackgroundMode from dependency array if it doesn't affect interval logic
  }, [isPaused, isInitialized]); 
  
  // Disable mouse handlers in background mode
  const handleMouseEnter = isBackgroundMode ? undefined : () => setIsPaused(true);
  const handleMouseLeave = isBackgroundMode ? undefined : () => setIsPaused(false);
  const handleMouseMove = isBackgroundMode ? undefined : (e) => {
    if (!slideshowRef.current) return;
    
    const { left, top, width, height } = slideshowRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const activeSlide = slideshowRef.current.querySelector(`.${styles.active} .${styles.slideshowImage}`);
    if (activeSlide) {
      activeSlide.style.transform = `scale(1.05) translate(${x * 20}px, ${y * 20}px)`;
    }
  };
  
  // Disable manual navigation in background mode
  const goToSlide = isBackgroundMode ? undefined : (index) => {
    setCurrentImageIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };
  
  return (
    <div 
      className={`${styles.slideshowContainer} ${isBackgroundMode ? styles.backgroundMode : ''}`} 
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.slideshowImage}
            />
          </div>
          {!isBackgroundMode && (
            <div className={styles.caption}>
              <p>{image.caption}</p>
            </div>
          )}
        </div>
      ))}
      
      {!isBackgroundMode && (
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
      )}
    </div>
  );
} 