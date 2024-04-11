import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useTranslation } from 'react-i18next';

const LoginForm = ({ onSwitchView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const { data } = await login({ email, password });
      console.log('Login success', data);
      window.location.reload();
    } catch (error) {
      console.error('Login failed', error);
      setError(t('loginError'));
    }
  };

  return (
    <>
      <h3 className="text-lg font-bold">{t('login')}</h3>
      <form onSubmit={handleSubmit} className="py-4">
        <input
          type="email"
          placeholder={t('email')}
          className="input input-bordered w-full mb-2"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t('password')}
          className="input input-bordered w-full mb-2"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">{t('login')}</button>
      </form>
      <p className="text-center">
        {t('noaccount')} <button onClick={onSwitchView} className="link link-primary">{t('register')}</button>
      </p>
    </>
  );
};

export default LoginForm;
