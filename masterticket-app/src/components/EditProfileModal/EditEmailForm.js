import React, { useState } from 'react';
import { patchUserData } from '../../services/apiService';
import { getToken, removeToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditEmailForm = ({ initialValue, onClose }) => {
  const [email, setEmail] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError(t('errorInvalidEmail'));
      return;
    }

    const token = getToken();
    try {
      const data = await patchUserData({ email }, token);
      console.log('Email updated');
      setSuccess(t('updateSuccess'));
      if (data.email !== initialValue) {
        removeToken();
        window.location.reload();
      }
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update email', error);
      setError(t('errorUpdatingEmail'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
      <button type="submit" className="btn btn-primary">{t('save')}</button>
    </form>
  );
};

export default EditEmailForm;
