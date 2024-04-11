import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthModal = ({ isOpen, onClose, isLoginView: initialIsLoginView }) => {
  const [isLoginView, setIsLoginView] = useState(initialIsLoginView);
  const { t } = useTranslation();

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        {isLoginView ? (
          <LoginForm onSwitchView={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm onSwitchView={() => setIsLoginView(true)} />
        )}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>{t('close')}</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
