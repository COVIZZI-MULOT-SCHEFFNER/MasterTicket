import React, { useState } from 'react';
import { patchUserData } from '../../services/apiService';
import { getToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditFirstNameForm = ({ initialValue, onClose }) => {
  const [firstname, setFirstName] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const token = getToken();
    try {
      await patchUserData({ firstname }, token);
      console.log('First name updated');
      setSuccess(t('updateSuccess'));
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update first name', error);
      setError(t('errorUpdatingFirstName'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder={t('firstname')}
          value={firstname}
          onChange={e => setFirstName(e.target.value)}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
      <button type="submit" className="btn btn-primary">{t('save')}</button>
    </form>
  );
};

export default EditFirstNameForm;
