import React from 'react';
import { useTranslation } from 'react-i18next';

const eventsData = [
  {
    nom: 'concertRock',
    date: '2024-05-15',
    lieu: 'parisFrance',
    nombreMaxDePlaces: 500,
    description: 'concertRockDescription',
    prixParBillet: '30€',
  },
  {
    nom: 'expositionArtModerne',
    date: '2024-06-20',
    lieu: 'lyonFrance',
    nombreMaxDePlaces: 200,
    description: 'expositionArtModerneDescription',
    prixParBillet: '15€',
  },
];

const EventsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {eventsData.map((event, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t(event.nom)}</h2>
            <p><strong>{t('eventdate')}:</strong> {event.date}</p>
            <p><strong>{t('eventarea')}:</strong> {t(event.lieu)}</p>
            <p><strong>{t('eventnbmaxplace')}:</strong> {event.nombreMaxDePlaces}</p>
            <p><strong>{t('eventdescription')}:</strong> {t(event.description)}</p>
            <p><strong>{t('eventpriceforticket')}:</strong> {event.prixParBillet}</p>
            <button className="btn btn-primary">{t('reserver')}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;
