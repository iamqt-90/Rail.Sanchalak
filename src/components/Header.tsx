import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';

function getPageName(pathname: string) {
  if (pathname.startsWith('/stations')) return 'Stations';
  if (pathname.startsWith('/search')) return 'Search Train';
  if (pathname.startsWith('/idss')) return 'IDSS';
  if (pathname.startsWith('/live-map')) return 'Live Map';
  if (pathname.startsWith('/alerts')) return 'Alerts';
  if (pathname.startsWith('/rules')) return 'Rules';
  if (pathname.startsWith('/settings')) return 'Settings';
  return 'Dashboard';
}

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <header className="flex flex-col bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Top bar: page name and user info inline */}
      <nav className="flex items-center justify-between px-6 py-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 m-0">{pageName}</h2>
        {/* User info */}
        {user && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Username</span>
          </div>
        )}
      </nav>
    </header>
  );
}
