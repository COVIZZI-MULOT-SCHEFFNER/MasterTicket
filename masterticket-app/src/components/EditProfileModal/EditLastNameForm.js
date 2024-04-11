import React, { useState } from 'react';
import { patchUserData } from '../../services/apiService';
import { getToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditLastNameForm = ({ initialValue, onClose }) => {
  const [lastname, setLastName] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const token = getToken();
    try {
      await patchUserData({ lastname }, token);
      console.log('Last name updated');
      setSuccess(t('updateSuccess'));
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update last name', error);
      setError(t('errorUpdatingLastName')); // Assurez-vous d'avoir une clé de traduction pour cette erreur
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder={t('lastname')}
          value={lastname}
          onChange={e => setLastName(e.target.value)}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
      <button type="submit" className="btn btn-primary">{t('save')}</button>
    </form>
  );
};

export default EditLastNameForm;
