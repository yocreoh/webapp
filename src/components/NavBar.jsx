import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`
      p-4 
      text-center 
      backdrop-blur-md 
      bg-white/70
      supports-[backdrop-filter]:bg-white/60
      border-b 
      border-blue-700/10

      ${isHome ? 'fixed top-0 w-full z-50' : ''}
    `}>
        <Link to="/" className="font-roboto-thin font-thin text-xl font-medium">yocreoh.com</Link>
    </nav>
  );
}

export default NavBar;