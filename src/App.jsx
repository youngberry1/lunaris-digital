import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './index.css';

// Enhanced Custom hook for theme management
function useTheme() {
   const [theme, setTheme] = useState('light');

   useEffect(() => {
      // Check localStorage first
      const storedTheme = localStorage.getItem('theme');

      // Also check system preference if no stored theme
      if (!storedTheme) {
         const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
         ).matches;
         if (systemPrefersDark) {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
            return;
         }
      }

      if (storedTheme) {
         setTheme(storedTheme);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('theme', theme);

      document.documentElement.setAttribute('data-theme', theme);

      document.body.className = theme;
   }, [theme]);

   const toggleTheme = () => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
   };

   return { theme, toggleTheme };
}

function App() {
   const { theme, toggleTheme } = useTheme();

   return (
      <div className={`app ${theme}`}>
         <Header theme={theme} toggleTheme={toggleTheme} />

         <main role='main'>
            <Hero />
            <Services />
            <About />
            <Testimonials />
            <CTA />
            <Contact />
            <FAQ />
         </main>

         <Footer />
      </div>
   );
}

export default App;
