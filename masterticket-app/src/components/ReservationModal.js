import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';

const ReservationModal = ({ event, onClose }) => {
    const { t } = useTranslation();
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleReservation = async () => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.sub;

        setProcessing(true);
        try {
            const payload = {
                userId,
                eventId: event._id,
                numberOfTickets,
                cardNumber,
                expiryDate,
                cvv
            };
            const response = await axios.post(`${apiConfig.baseURL}/tickets/createPayment`, payload);
            alert(t('reservationSuccessful'));
            onClose();
        } catch (error) {
            setError(t('reservationFailed', { error: error.response?.data?.error || error.message }));
            console.error('Error making reservation:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-bold">{t('reserveTicketsFor')} {event.name}</h2>
                <div>
                    <label>{t('tickets')}:</label>
                    <input
                        type="number"
                        className="input input-bordered w-full my-2"
                        value={numberOfTickets}
                        onChange={e => setNumberOfTickets(e.target.value)}
                        min="1"
                        max={event.numberOfPlace}
                    />
                </div>
                <div>
                    <label>{t('cardNumber')}:</label>
                    <input
                        type="text"
                        className="input input-bordered w-full my-2"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>{t('expiryDate')}:</label>
                    <input
                        type="text"
                        className="input input-bordered w-full my-2"
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label>{t('cvv')}:</label>
                    <input
                        type="text"
                        className="input input-bordered w-full my-2"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                    />
                </div>
                <p>{t('totalPrice')}: {numberOfTickets * event.ticketPrice}€</p>
                <div className="modal-action">
                    <button
                        onClick={handleReservation}
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        {t('reserve')}
                    </button>
                    <button onClick={onClose} className="btn">{t('close')}</button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default ReservationModal;
