import React, { useState, useEffect } from 'react';
import logo from '../masterticket.svg';
import AuthModal from './AuthModal';
import { useTranslation } from 'react-i18next';
import { getToken, removeToken } from '../services/storageService';
import EditProfileModal from './EditProfileModal';
import useUserRole from '../hooks/useUserRole';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { t } = useTranslation();

  const userRole = useUserRole();

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginClick = () => {
    setIsLoginView(true);
    setModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsLoginView(false);
    setModalOpen(true);
  };

  const handleLogoutClick = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  return (
    <header className="bg-night-blue p-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} className="h-12 mr-4" alt="logo" />
        <h1 className="text-white text-3xl">{t('Master Ticket')}</h1>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <button onClick={handleLoginClick} className="text-white mr-4">{t('login')}</button>
            <button onClick={handleRegisterClick} className="text-white">{t('register')}</button>
          </>
        ) : (
          <>
            {(userRole === 'user' || userRole === 'admin') && (
              <button onClick={handleEditClick} className="text-white mr-4">{t('edit')}</button>
            )}
            <button onClick={handleLogoutClick} className="text-white">{t('logout')}</button>
          </>

        )}
      </div>
      <AuthModal key={isLoginView} isOpen={modalOpen} onClose={() => setModalOpen(false)} isLoginView={isLoginView} />
      <EditProfileModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </header>
  );
}

export default Header;
