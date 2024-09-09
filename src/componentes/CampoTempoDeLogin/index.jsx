import React, { useEffect, useState } from 'react';
import Alert from '../Alert';
import useAlertContext from '../../Hooks/useAlertContext';

const Countdown = ({ horaLogin }) => {
    const { setAlertaError } = useAlertContext();

    const calculateTimeLeft = () => {
        const sixHoursInMilliseconds = 6 * 60 * 60 * 1000; // 6 horas em milissegundos
        const targetTime = new Date(horaLogin).getTime() + sixHoursInMilliseconds; // Adiciona 6 horas à hora de login
        const currentTime = new Date().getTime(); // Hora atual
        const difference = targetTime - currentTime; // Diferença entre a hora alvo e a atual

        let timeLeft = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [horaLogin]);

    if(timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        return setAlertaError("Login expirado, refaça o login!")
    }

    return (
        <p>
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
        </p>
    );
};

export default Countdown;
