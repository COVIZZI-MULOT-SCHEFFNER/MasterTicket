import React from 'react';
import { useTranslation } from 'react-i18next';

const reservationsData = [
  {
    eventId: 'concertRock',
    userId: 'user123',
    numero: '00001',
    prix: '30€',
    statut: 'achete',
  },
  {
    eventId: 'expositionArtModerne',
    userId: 'user456',
    numero: '00002',
    prix: '15€',
    statut: 'valide',
  },
  // Ajoutez plus de réservations selon vos besoins
];

const ReservationsPage = () => {
  const { t } = useTranslation();

  const handleCancelClick = () => {
    // Ici, vous pourrez ajouter la logique pour annuler une réservation
    console.log('Annulation demandée');
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {reservationsData.map((reservation, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t(`event.${reservation.eventId}.nom`)}</h2>
            <p><strong>{t('reservationeventname')}:</strong> {t(`event.${reservation.eventId}.nom`)}</p>
            <p><strong>{t('reservationusername')}:</strong> {reservation.userId}</p>
            <p><strong>{t('reservationnumero')}:</strong> {reservation.numero}</p>
            <p><strong>{t('reservationname')}:</strong> {reservation.prix}</p>
            <p><strong>{t('reservationstatut')}:</strong> {t(`statut.${reservation.statut}`)}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-error" onClick={handleCancelClick}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationsPage;
