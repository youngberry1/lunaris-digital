import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
   const heroRef = useRef(null);
   const textRef = useRef(null);

   useEffect(() => {
      if (heroRef.current) {
         heroRef.current.classList.add('animate-in');
      }
   }, []);

   const handleGetStarted = () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
         servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <section className='hero' id='home' ref={heroRef}>
         <div className='container'>
            <div className='hero-content' ref={textRef}>
               <h1 className='hero-title'>
                  <span className='title-line'>Creative Solutions</span>
                  <span className='title-line'>for a Digital World</span>
               </h1>
               <p className='hero-description'>
                  We craft stunning designs, scalable apps, and smart strategies
                  to elevate your business.
               </p>
               <div className='hero-actions'>
                  <button
                     className='btn hero-btn primary'
                     onClick={handleGetStarted}
                     aria-label='Get started with Lunaris Digital'
                  >
                     <span>Get Started</span>
                     <i className='fa-solid fa-arrow-right'></i>
                  </button>
                  <button
                     className='btn hero-btn secondary'
                     onClick={() =>
                        document
                           .getElementById('contact')
                           .scrollIntoView({ behavior: 'smooth' })
                     }
                     aria-label='Contact us for more information'
                  >
                     <span>Contact Us</span>
                     <i className='fa-solid fa-envelope'></i>
                  </button>
               </div>
            </div>

            <div className='hero-background'>
               <div className='floating-shape shape-1'></div>
               <div className='floating-shape shape-2'></div>
               <div className='floating-shape shape-3'></div>
               <div className='floating-shape shape-4'></div>
            </div>
         </div>
      </section>
   );
};

export default Hero;
