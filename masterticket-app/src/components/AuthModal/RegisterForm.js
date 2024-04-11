import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useTranslation } from 'react-i18next';

const RegisterForm = ({ onSwitchView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    };

    const validatePhone = (phone) => {
        const regex = /^[+]?[0-9]{10,13}$/;
        return regex.test(phone);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError(t('errorInvalidEmail'));
            return;
        }
        if (!validatePhone(phone)) {
            setError(t('errorInvalidPhone'));
            return;
        }
        if (!validatePassword(password)) {
            setError(t('errorInvalidPassword'));
            return;
        }

        try {
            const { data } = await register({ email, password, firstname, lastname, phone, role: 'user' });
            console.log('Registration success', data);
            window.location.reload();
        } catch (error) {
            console.error('Registration failed', error);
            setError(t('errorRegister'));
        }
    };


    return (
        <>
            <h3 className="text-lg font-bold">{t('register')}</h3>
            <form onSubmit={handleSubmit} className="py-4">
                <input
                    type="email"
                    placeholder={t('email')}
                    className="input input-bordered w-full mb-2"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={t('password')}
                    className="input input-bordered w-full mb-2"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="text-xs mb-4 text-gray-500">
                    {t('passwordRequirements')}
                </p>
                <input
                    type="text"
                    placeholder={t('firstname')}
                    className="input input-bordered w-full mb-2"
                    value={firstname}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t('lastname')}
                    className="input input-bordered w-full mb-2"
                    value={lastname}
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder={t('phone')}
                    className="input input-bordered w-full mb-2"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button type="submit" className="btn btn-primary w-full">{t('register')}</button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <p className="text-center">
                {t('haveaccount')} <button onClick={onSwitchView} className="link link-primary">{t('login')}</button>
            </p>
        </>
    );
};

export default RegisterForm;
