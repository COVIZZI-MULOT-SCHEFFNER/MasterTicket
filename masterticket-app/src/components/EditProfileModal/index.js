import React, { useState, useEffect } from 'react';
import EditEmailForm from './EditEmailForm';
import EditFirstNameForm from './EditFirstNameForm';
import EditLastNameForm from './EditLastNameForm';
import EditPhoneForm from './EditPhoneForm';
import EditPasswordForm from './EditPasswordForm';

import { fetchUserData } from '../../services/apiService';
import { getToken } from '../../services/storageService';
import { useTranslation } from 'react-i18next';

const EditProfileModal = ({ isOpen, onClose }) => {
    const [userData, setUserData] = useState({});
    const [activeForm, setActiveForm] = useState('email');
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
          const token = getToken();
          if (token && isOpen) {
            try {
              const fetchedData = await fetchUserData(token);
              setUserData(fetchedData);
            } catch (error) {
              console.error('Failed to fetch user data', error);
            }
          }
        };
        fetchData();
      }, [isOpen]);

    const renderForm = () => {
        switch (activeForm) {
            case 'email':
              return <EditEmailForm initialValue={userData.email} onSwitchForm={setActiveForm} />;
            case 'firstName':
                return <EditFirstNameForm initialValue={userData.firstname} onSwitchForm={setActiveForm} />;
            case 'lastName':
                return <EditLastNameForm initialValue={userData.lastname} onSwitchForm={setActiveForm} />;
            case 'phone':
                return <EditPhoneForm initialValue={userData.phone} onSwitchForm={setActiveForm} />;
            case 'password':
              return <EditPasswordForm onSwitchForm={setActiveForm} />;
            default:
                return null;
        }
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative max-w-4xl">
                <div className="modal-action overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                        <button className="btn h-auto min-h-[4rem]" onClick={() => setActiveForm('email')}>{t('editEmail')}</button>
                        <button className="btn h-auto min-h-[4rem]" onClick={() => setActiveForm('firstName')}>{t('editFirstName')}</button>
                        <button className="btn h-auto min-h-[4rem]" onClick={() => setActiveForm('lastName')}>{t('editLastName')}</button>
                        <button className="btn h-auto min-h-[4rem]" onClick={() => setActiveForm('phone')}>{t('editPhone')}</button>
                        <button className="btn h-auto min-h-[4rem]" onClick={() => setActiveForm('password')}>{t('editPassword')}</button>
                    </div>
                </div>
                {renderForm()}
                <button className="btn btn-primary absolute bottom-0 right-0 m-4" onClick={onClose}>{t('close')}</button>
            </div>
        </div>

    );
};

export default EditProfileModal;
