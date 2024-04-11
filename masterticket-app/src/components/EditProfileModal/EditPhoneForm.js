import React, { useState } from 'react';
import { patchUserData } from '../../services/apiService';
import { getToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditPhoneForm = ({ initialValue, onClose }) => {
  const [phone, setPhone] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const validatePhone = (phone) => {
    const regex = /^[+]?[0-9]{10,13}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePhone(phone)) {
      setError(t('errorInvalidPhone'));
      return;
    }

    const token = getToken();
    try {
      await patchUserData({ phone }, token);
      console.log('Phone number updated');
      setSuccess(t('updateSuccess'));
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update phone number', error);
      setError(t('errorUpdatingPhone'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder={t('phone')}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
      <button type="submit" className="btn btn-primary">{t('save')}</button>
    </form>
  );
};

export default EditPhoneForm;
