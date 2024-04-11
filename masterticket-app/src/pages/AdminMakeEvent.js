import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdminMakeEvent = () => {
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({
    nom: '',
    date: '',
    lieu: '',
    nombreMaxDePlaces: '',
    description: '',
    prixParBillet: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
    // Ici, vous ajouterez la logique pour soumettre ces données à l'API une fois disponible.
    alert('Evènement créé (simulation)');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{t('createEvent')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">{t('eventName')}</label>
          <input type="text" name="nom" value={eventData.nom} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t('eventDate')}</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">{t('eventLocation')}</label>
          <input type="text" name="lieu" value={eventData.lieu} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="nombreMaxDePlaces" className="block text-sm font-medium text-gray-700">{t('eventMaxTickets')}</label>
          <input type="number" name="nombreMaxDePlaces" value={eventData.nombreMaxDePlaces} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('eventDescription')}</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="prixParBillet" className="block text-sm font-medium text-gray-700">{t('eventTicketPrice')}</label>
          <input type="text" name="prixParBillet" value={eventData.prixParBillet} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <button type="submit" className="btn btn-primary">{t('create')}</button>
      </form>
    </div>
  );
};

export default AdminMakeEvent;
