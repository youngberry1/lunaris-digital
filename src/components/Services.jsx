import { useRef, useEffect } from 'react';
import './Services.css';

const SERVICES = [
   {
      icon: 'fa-laptop-code',
      title: 'Web Design',
      description:
         'Modern, responsive, and optimized websites that engage your audience.',
   },
   {
      icon: 'fa-mobile-screen-button',
      title: 'App Development',
      description:
         'Cross-platform applications built for performance and scalability.',
   },
   {
      icon: 'fa-compass-drafting',
      title: 'UI/UX Strategy',
      description:
         'Intuitive experiences backed by research and user behavior.',
   },
   {
      icon: 'fa-palette',
      title: 'Branding',
      description:
         'Visual identities that reflect your mission and leave an impression.',
   },
   {
      icon: 'fa-chart-line',
      title: 'SEO & Marketing',
      description:
         'Boost visibility and drive traffic with smart optimization strategies.',
   },
];

const Services = () => {
   const sectionRef = useRef(null);
   const cardsRef = useRef([]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');

                  // Stagger animation for cards
                  if (entry.target.classList.contains('service-card')) {
                     const index = cardsRef.current.indexOf(entry.target);
                     entry.target.style.animationDelay = `${index * 0.1}s`;
                  }
               }
            });
         },
         { threshold: 0.1, rootMargin: '-50px' }
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      cardsRef.current.forEach((card) => {
         if (card) observer.observe(card);
      });

      return () => observer.disconnect();
   }, []);

   const addToCardsRef = (el, index) => {
      cardsRef.current[index] = el;
   };

   return (
      <section className='services' id='services' ref={sectionRef}>
         <div className='container'>
            <div className='services-header'>
               <h2 className='services-title'>Our Services</h2>
               <p className='services-subtitle'>
                  Tailored digital solutions to help you grow and stand out.
               </p>
            </div>

            <div className='services-grid'>
               {SERVICES.map((service, index) => (
                  <div
                     key={index}
                     className='service-card'
                     ref={(el) => addToCardsRef(el, index)}
                  >
                     <div className='service-icon-wrapper'>
                        <i
                           className={`fa-solid ${service.icon} service-icon`}
                        ></i>
                        <div className='icon-background'></div>
                     </div>
                     <h3 className='service-title'>{service.title}</h3>
                     <p className='service-description'>
                        {service.description}
                     </p>
                     <div className='service-hover-effect'></div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Services;
