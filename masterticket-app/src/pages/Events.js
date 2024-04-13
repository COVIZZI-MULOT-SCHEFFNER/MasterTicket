import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { useTranslation } from 'react-i18next';
import ReservationModal from '../components/ReservationModal';

const EventsPage = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleReserveClick = (event) => {
    setSelectedEvent(event);
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  return (
    <div className="flex flex-col items-center justify-start p-4">
      {selectedEvent && (
        <ReservationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {events.length > 0 ? (
        <div className="w-full max-w-6xl p-4">
          <div className="flex flex-wrap justify-center gap-4">
            {events.map((event, index) => (
              <div key={index} className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{event.name}</h2>
                  <p><strong>{t('eventdate')}:</strong> {formatDate(event.date)}</p>
                  <p><strong>{t('eventarea')}:</strong> {event.location}</p>
                  <p><strong>{t('eventnbmaxplace')}:</strong> {event.numberOfPlace}</p>
                  <p><strong>{t('eventdescription')}:</strong> {event.description}</p>
                  <p><strong>{t('eventpriceforticket')}:</strong> {event.ticketPrice}€</p>
                  <button className="btn btn-primary" onClick={() => handleReserveClick(event)}>{t('reserver')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xl text-gray-500">{t('noEventsFound')}</p>
      )}
    </div>
  );
};

export default EventsPage;
