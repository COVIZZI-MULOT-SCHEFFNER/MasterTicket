import React, { useState } from 'react';
import { patchUserData } from '../../services/apiService';
import { getToken, removeToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditPasswordForm = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[a-z]/.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword(password)) {
      setError(t('errorInvalidPassword'));
      return;
    }

    const token = getToken();
    try {
      await patchUserData({ password }, token);
      console.log('Password updated');
      setSuccess(t('updateSuccess'));
      removeToken();
      window.location.reload();
    } catch (error) {
      console.error('Failed to update password', error);
      setError(t('errorUpdatingPassword'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="password"
          placeholder={t('newPassword')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        />
        <p className="text-xs mt-1 text-gray-500">
          {t('passwordRequirements')}
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>
      <button type="submit" className="btn btn-primary">{t('save')}</button>
    </form>
  );
};

export default EditPasswordForm;
