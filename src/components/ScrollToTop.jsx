import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Helper component to inject CSS styles into the document head.
// This avoids dependency issues with styled-components.
const ComponentStyles = () => {
    // CSS from the user's provided design
    const css = `
      .s-t-t-button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 50;
        cursor: pointer;
        border: none;
        background: #2a1a1f;
        color: #FFD600;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        display: grid;
        place-content: center;
        transition: background 300ms, transform 200ms;
        font-weight: 600;
        font-size: 14px; 
      }

      .s-t-t-button__text {
        position: absolute;
        width: 100%;
        height: 100%;
        animation: s-t-t-text-rotation 8s linear infinite;
      }

      /* Using a more robust method for circular text alignment */
      .s-t-t-button__text > span {
        position: absolute;
        top: 0;
        left: 50%;
        height: 50px; /* Half of the button's height (radius) */
        transform-origin: bottom center; /* Set rotation point to the button's center */
        transform: translateX(-50%) rotate(calc(20deg * var(--index)));
        color: #FFD600;
      }

      .s-t-t-button__circle {
        position: relative;
        width: 40px;
        height: 40px;
        overflow: hidden;
        background: #FFD600;
        color: #2a1a1f;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .s-t-t-button__icon {
        transition: transform 0.3s ease-in-out;
      }

      .s-t-t-button__icon--copy {
        position: absolute;
        transform: translate(0%, 150%);
      }

      .s-t-t-button:hover {
        background: #000;
        transform: scale(1.05);
      }
      
      .s-t-t-button:hover .s-t-t-button__icon {
         color: #000;
      }

      .s-t-t-button:hover .s-t-t-button__icon:first-child {
        transform: translate(0%, -150%);
      }

      .s-t-t-button:hover .s-t-t-button__icon--copy {
        transform: translate(0);
        transition-delay: 0.1s;
      }

      @keyframes s-t-t-text-rotation {
        to {
          transform: rotate(360deg);
        }
      }
    `;

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = css;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, [css]);

    return null;
};
const ScrollToTop = ({ scrollableRef }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const scrollTarget = scrollableRef?.current || window;

        const getScrollTop = () => {
            return scrollableRef?.current ? scrollableRef.current.scrollTop : window.pageYOffset;
        };

        const toggleVisibility = () => {
            if (getScrollTop() > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        scrollTarget.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => scrollTarget.removeEventListener('scroll', toggleVisibility);
    }, [scrollableRef]);

    const scrollToTop = () => {
        const target = scrollableRef?.current || window;
        target.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
       
        </>
    );
};

export default ScrollToTop