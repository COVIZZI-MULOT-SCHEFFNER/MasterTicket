import React from 'react';
import Header from './components/Header';
import { NavigationProvider } from './NavigationContext';
import AppNavigation from './components/AppNavigation';
import Page from './Page';
import LanguageSwitcher from './components/LanguageSwitcher';
import useTokenValidation from './hooks/useTokenValidation';

const App = () => {
  useTokenValidation();

  return (
    <div className="App">
      <NavigationProvider>
      <Header />
      <LanguageSwitcher />
      <AppNavigation />
      <Page />
    </NavigationProvider>
    </div>
  );
}

export default App;
