import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import apiConfig from '../config/apiConfig';

const ReservationsPage = () => {
  const { t } = useTranslation();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/tickets/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelClick = async (reservationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${apiConfig.baseURL}/tickets/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedReservations = reservations.filter(reservation => reservation._id !== reservationId);
      setReservations(updatedReservations);
      console.log('Reservation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-3">{t('noReservationsFound')}</p>
          <p className="text-gray-600 mb-4">{t('youCanBookReservations')}</p>
          <a href="/reservations" className="btn btn-primary">{t('goToReservations')}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {reservations.map((reservation, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{reservation.eventName}</h2>
            <p><strong>{t('reservationNumber')}:</strong> {reservation._id}</p>
            <p><strong>{t('reservationNumberTicket')}:</strong> {reservation.number}</p>
            <p><strong>{t('reservationStatus')}:</strong> {reservation.status}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-error" onClick={() => handleCancelClick(reservation._id)}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationsPage;
