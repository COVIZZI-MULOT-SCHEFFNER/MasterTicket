import React from 'react';
import { useNavigation } from '../NavigationContext';
import { useTranslation } from 'react-i18next';
import useUserRole from '../hooks/useUserRole';

const AppNavigation = () => {
  const { navigate } = useNavigation();
  const userRole = useUserRole();
  const { t } = useTranslation();

  return (
    <div className="flex justify-center gap-4 my-4">
      {(userRole === 'user' || userRole === 'admin') && (
        <>
          <button
            className="btn"
            onClick={() => navigate('events')}
          >
            {t('events')}
          </button>
          <button
            className="btn"
            onClick={() => navigate('reservation')}
          >
            {t('reservation')}
          </button>
        </>
      )}
      {userRole === 'admin' && (
        <>
        <button
          className="btn"
          onClick={() => navigate('adminevents')}
        >
          {t('adminevents')}
        </button>
        <button
        className="btn"
        onClick={() => navigate('adminmakeevent')}
      >
        {t('adminmakeevent')}
      </button>
      <button
        className="btn"
        onClick={() => navigate('adminusers')}
      >
        {t('adminusers')}
      </button>
      </>
      )}
    </div>
  );
};

export default AppNavigation;
