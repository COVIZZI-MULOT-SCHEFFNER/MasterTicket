import React from 'react';
import Events from './pages/Events';
import Reservation from './pages/Reservation';
import AdminEvent from './pages/AdminEvent';
import AdminMakeEvent from './pages/AdminMakeEvent';
import AdminUser from './pages/AdminUser';
import { useNavigation } from './NavigationContext';

const Page = () => {
  const { currentPage } = useNavigation();

  switch (currentPage) {
    case 'events':
      return <Events />;
    case 'reservation':
      return <Reservation />;
    case 'adminevents':
      return <AdminEvent />;
    case 'adminmakeevent':
      return <AdminMakeEvent />;
    case 'adminusers':
      return <AdminUser />;
    default:
      return <Events />;
  }
};

export default Page;
