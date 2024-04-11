import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import apiConfig from '../config/apiConfig';
import EditEventForm from '../components/Admin/EditEventForm';

const AdminEvent = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${apiConfig.baseURL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(events.filter(event => event.id !== eventId));
      console.log(`Event with ID: ${eventId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleCloseEditForm = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {editingEvent && <EditEventForm event={editingEvent} onClose={handleCloseEditForm} />}
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th>{t('eventname')}</th>
              <th>{t('eventdate')}</th>
              <th>{t('eventlocation')}</th>
              <th>{t('eventmaxSeats')}</th>
              <th>{t('eventticketPrice')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.maxSeats}</td>
                <td>{`${event.ticketPrice}€`}</td>
                <td>
                  <button className="btn btn-secondary mr-2" onClick={() => handleEditEvent(event)}>
                    {t('edit')}
                    <i className="fas fa-edit ml-2"></i>
                  </button>
                  <button className="btn btn-error" onClick={() => handleDeleteEvent(event.id)}>
                    {t('delete')}
                    <i className="fas fa-trash-alt ml-2"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvent;
