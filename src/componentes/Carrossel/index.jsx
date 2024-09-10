import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "./Carrossel.css";
import styled from 'styled-components';

const IconeNextEstilizado = styled(MdNavigateNext)`
    cursor: pointer;
    width: 50px;
    height: 50px;
`

const IconeBeforeEstilizado = styled(MdNavigateBefore)`
    cursor: pointer;
    width: 50px;
    height: 50px;
`

export default function Carrossel({ items }) {
    const carousel = useRef();
    const [width, setWidth] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const slideWidth = 200; 

    useEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
    }, []);

    useEffect(() => {
        carousel.current.scrollTo({ left: -currentX, behavior: 'smooth' });
    }, [currentX]);

    const handleNext = () => {
        setCurrentX(prev => Math.max(prev - slideWidth, -width));
    };

    const handlePrev = () => {
        setCurrentX(prev => Math.min(prev + slideWidth, 0));
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x < -50) {
            handleNext();
        } else if (info.offset.x > 50) {
            handlePrev();
        }
    };

    return (
        <div className='principal'>
            <IconeBeforeEstilizado onClick={handlePrev} />
            <motion.div
                className='carousel'
                whileTap={{ cursor: "grabbing" }}
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
