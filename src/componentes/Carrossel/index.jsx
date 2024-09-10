import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "./Carrossel.css";
import styled from 'styled-components';

const IconeNextEstilizado = styled(MdNavigateNext)`
    cursor: pointer;
    min-width: 50px;
    min-height: 50px;

    @media (max-width: 562px) {
        position: absolute;
        right: 0;
        z-index: 1000;
    }
`

const IconeBeforeEstilizado = styled(MdNavigateBefore)`
    cursor: pointer;
    min-width: 50px;
    min-height: 50px;

    @media (max-width: 562px) {
        position: absolute;
        left: 0;
        z-index: 1000;
    }
`

export default function Carrossel({ items }) {
    const carousel = useRef();
    const [width, setWidth] = useState(0);
    const [currentX, setCurrentX] = useState(0); 
    const slideWidth = 300; 

    useEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    }, [items]);

    const handleNext = () => {
        
        setCurrentX(prev => Math.max(prev - slideWidth, -width));
    };

    const handlePrev = () => {
        
        setCurrentX(prev => Math.min(prev + slideWidth, 0));
    };

    const handleDragEnd = (event, info) => {
        const threshold = 50; 
        const movement = info.offset.x;

        if (movement < -threshold) {
            handleNext();
        } else if (movement > threshold) {
            handlePrev();
        }
    };

    return (
        <div className='principal'>
            <IconeBeforeEstilizado onClick={handlePrev} />
            <motion.div
                className='carousel'
                ref={carousel}
            >
                <motion.div
                    className='inner'
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    onDragEnd={handleDragEnd} 
                    animate={{ x: currentX }} 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                >
                    {
                        items.map((item, index) => (
                            <motion.div
                                key={index}
                                className='item'
                            >
                                {item}
                            </motion.div>
                        ))
                    }
                </motion.div>
            </motion.div>
            <IconeNextEstilizado onClick={handleNext} />
        </div>
    );
}
