import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

const AdminMakeEvent = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    numberOfPlace: '',
    description: '',
    ticketPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date: formData.date ? format(new Date(formData.date), 'yyyy-MM-dd') : '',
    };
    try {
      const response = await axios.post(`${apiConfig.adminURL}/events`, formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Event created successfully', response.data);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{t('createEvent')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('eventName')}</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t('eventDate')}</label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('eventLocation')}</label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfPlace" className="block text-sm font-medium text-gray-700">{t('eventMaxTickets')}</label>
          <input type="number" name="numberOfPlace" id="numberOfPlace" value={formData.numberOfPlace} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('eventDescription')}</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">{t('eventTicketPrice')}</label>
          <input type="number" name="ticketPrice" id="ticketPrice" value={formData.ticketPrice} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <button type="submit" className="btn btn-primary">{t('create')}</button>
      </form>
    </div>
  );
};

export default AdminMakeEvent;
