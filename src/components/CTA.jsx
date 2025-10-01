import { useRef, useEffect } from 'react';
import './CTA.css';

const CTA = () => {
   const sectionRef = useRef(null);
   const contentRef = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
               }
            });
         },
         { threshold: 0.3, rootMargin: '-50px' }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      if (contentRef.current) observer.observe(contentRef.current);

      return () => observer.disconnect();
   }, []);

   const handleGetInTouch = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
         contactSection.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <section className='cta' id='cta' ref={sectionRef}>
         <div className='container'>
            <div className='cta-content' ref={contentRef}>
               <h2 className='cta-title'>
                  Ready to elevate your digital presence?
               </h2>
               <p className='cta-description'>
                  Let's build something incredible together. Reach out and get
                  your project started today.
               </p>
               <div className='cta-actions'>
                  <button
                     className='btn cta-btn primary'
                     onClick={handleGetInTouch}
                     aria-label='Get in touch with Lunaris Digital'
                  >
                     <span>Get in Touch</span>
                     <i className='fa-solid fa-arrow-right'></i>
                  </button>
                  <button
                     className='btn cta-btn secondary'
                     onClick={() =>
                        document
                           .getElementById('services')
                           .scrollIntoView({ behavior: 'smooth' })
                     }
                     aria-label='View our services'
                  >
                     <span>Our Services</span>
                     <i className='fa-solid fa-sparkles'></i>
                  </button>
               </div>
            </div>

            {/* Animated background elements */}
            <div className='cta-background'>
               <div className='cta-shape shape-1'></div>
               <div className='cta-shape shape-2'></div>
               <div className='cta-shape shape-3'></div>
               <div className='cta-shape shape-4'></div>
            </div>
         </div>
      </section>
   );
};

export default CTA;
