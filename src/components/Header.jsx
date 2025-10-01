import { useState, useEffect, Fragment } from 'react';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   const toggleMenu = () => setMenuOpen((prev) => !prev);
   const closeMenu = () => setMenuOpen(false);

   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === 'Escape') closeMenu();
      };

      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };

      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const navLinks = [
      { href: '#home', label: 'Home' },
      { href: '#services', label: 'Services' },
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' },
   ];

   const renderNavLinks = (onClick) =>
      navLinks.map((link) => (
         <a key={link.href} href={link.href} onClick={onClick}>
            {link.label}
         </a>
      ));

   return (
      <Fragment>
         <header
            className={`header ${theme} ${scrolled ? 'scrolled' : ''}`}
            role='banner'
         >
            <div className='container'>
               <div className='logo' aria-label='Lunaris Digital Logo'>
                  Lunaris Digital
               </div>

               <nav
                  className='nav desktop-nav'
                  role='navigation'
                  aria-label='Primary'
               >
                  {renderNavLinks()}
               </nav>

               <div className='header-actions'>
                  <button
                     className='theme-toggle'
                     onClick={toggleTheme}
                     aria-label={`Switch to ${
                        theme === 'light' ? 'dark' : 'light'
                     } mode`}
                  >
                     {theme === 'light' ? '🌙' : '☀️'}
                  </button>

                  <button
                     className='hamburger'
                     onClick={toggleMenu}
                     aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                     aria-expanded={menuOpen}
                     aria-controls='mobile-menu'
                  >
                     {menuOpen ? '✕' : '☰'}
                  </button>
               </div>
            </div>
         </header>

         <aside
            id='mobile-menu'
            className={`mobile-menu ${menuOpen ? 'open' : ''} ${theme}`}
            role='navigation'
            aria-label='Mobile'
         >
            <nav className='nav mobile-nav'>
               {renderNavLinks(closeMenu)}
               <button
                  className='theme-toggle'
                  onClick={() => {
                     toggleTheme();
                     closeMenu();
                  }}
                  aria-label={`Switch to ${
                     theme === 'light' ? 'dark' : 'light'
                  } mode`}
               >
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
               </button>
            </nav>
         </aside>

         {menuOpen && (
            <div
               className='backdrop'
               onClick={closeMenu}
               tabIndex='0'
               aria-hidden='true'
            />
         )}
      </Fragment>
   );
};

export default Header;
