import { useRef, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
   const currentYear = new Date().getFullYear();
   const footerRef = useRef(null);

   const footerLinks = [
      { href: '#home', label: 'Home', icon: 'fa-home' },
      { href: '#services', label: 'Services', icon: 'fa-rocket' },
      { href: '#testimonials', label: 'Testimonials', icon: 'fa-star' },
      { href: '#faq', label: 'FAQs', icon: 'fa-question-circle' },
      { href: '#contact', label: 'Contact', icon: 'fa-envelope' },
   ];

   const socialLinks = [
      {
         href: 'https://facebook.com',
         label: 'Facebook',
         icon: 'fa-brands fa-facebook-f',
         color: '#1877F2',
      },
      {
         href: 'https://twitter.com',
         label: 'Twitter',
         icon: 'fa-brands fa-twitter',
         color: '#1DA1F2',
      },
      {
         href: 'https://linkedin.com',
         label: 'LinkedIn',
         icon: 'fa-brands fa-linkedin-in',
         color: '#0077B5',
      },
      {
         href: 'https://instagram.com',
         label: 'Instagram',
         icon: 'fa-brands fa-instagram',
         color: '#E4405F',
      },
   ];

   const services = [
      'Web Design',
      'Development',
      'Brand Strategy',
      'Digital Marketing',
      'UI/UX Design',
   ];

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
               }
            });
         },
         { threshold: 0.1 }
      );

      if (footerRef.current) observer.observe(footerRef.current);

      return () => observer.disconnect();
   }, []);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
      <footer className='footer' ref={footerRef}>
         {/* Main Footer Content */}
         <div className='footer-main'>
            <div className='footer-container'>
               {/* Brand Section */}
               <div className='footer-column brand-column'>
                  <div className='brand-wrapper'>
                     <h3 className='brand-logo'>
                        <span className='logo-icon'>🌙</span>
                        Lunaris Digital
                     </h3>
                     <p className='brand-description'>
                        Creating digital experiences that empower brands to
                        thrive in the modern landscape through innovative
                        design, development, and strategy.
                     </p>
                     <div className='social-links'>
                        {socialLinks.map((link, index) => (
                           <a
                              key={link.label}
                              href={link.href}
                              className='social-link'
                              aria-label={link.label}
                              target='_blank'
                              rel='noopener noreferrer'
                              style={{ '--social-color': link.color }}
                           >
                              <i className={link.icon}></i>
                           </a>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Quick Links */}
               <div className='footer-column links-column'>
                  <h4 className='column-title'>Quick Navigation</h4>
                  <ul className='footer-nav'>
                     {footerLinks.map((link, index) => (
                        <li key={link.href} className='nav-item'>
                           <a href={link.href} className='nav-link'>
                              <span className='link-icon'>
                                 <i className={`fas ${link.icon}`}></i>
                              </span>
                              <span className='link-text'>{link.label}</span>
                              <span className='link-hover-effect'></span>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Services */}
               <div className='footer-column services-column'>
                  <h4 className='column-title'>Our Services</h4>
                  <div className='services-grid'>
                     {services.map((service, index) => (
                        <div key={service} className='service-tag'>
                           {service}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Contact Section */}
               <div className='footer-column contact-column'>
                  <h4 className='column-title'>Get In Touch</h4>
                  <div className='contact-info'>
                     <div className='contact-item'>
                        <div className='contact-icon'>
                           <i className='fas fa-map-marker-alt'></i>
                        </div>
                        <div className='contact-detail'>
                           <span className='contact-label'>Our Location</span>
                           <span className='contact-value'>
                              EV-1109-2112 Asamankese, Ghana - E/R
                           </span>
                        </div>
                     </div>

                     <div className='contact-item'>
                        <div className='contact-icon'>
                           <i className='fas fa-envelope'></i>
                        </div>
                        <div className='contact-detail'>
                           <span className='contact-label'>Email Us</span>
                           <a
                              href='mailto:hello@lunarisdigital.com'
                              className='contact-value link-email'
                           >
                              hello@lunarisdigital.com
                           </a>
                        </div>
                     </div>

                     <div className='contact-item'>
                        <div className='contact-icon'>
                           <i className='fas fa-phone'></i>
                        </div>
                        <div className='contact-detail'>
                           <span className='contact-label'>Call Us</span>
                           <a
                              href='tel:+233557560911'
                              className='contact-value link-phone'
                           >
                              +233 55 756 0911
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Footer Bottom */}
         <div className='footer-bottom'>
            <div className='footer-bottom-container'>
               <div className='footer-bottom-content'>
                  <p className='copyright'>
                     &copy; {currentYear}{' '}
                     <span className='company-name'>Lunaris Digital</span>. All
                     rights reserved.
                  </p>

                  <div className='footer-actions'>
                     <button
                        className='back-to-top'
                        onClick={scrollToTop}
                        aria-label='Back to top'
                     >
                        <i className='fas fa-chevron-up'></i>
                        <span className='top-text'>Back to Top</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
