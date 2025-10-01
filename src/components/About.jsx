import { useRef, useEffect } from 'react';
import teamImg from '../assets/team.jpg';
import './About.css';

const About = () => {
   const sectionRef = useRef(null);
   const textRef = useRef(null);
   const imageRef = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');

                  if (entry.target.classList.contains('about-text')) {
                     const paragraphs = entry.target.querySelectorAll('p');
                     paragraphs.forEach((p, index) => {
                        p.style.animationDelay = `${0.3 + index * 0.2}s`;
                     });
                  }
               }
            });
         },
         { threshold: 0.2, rootMargin: '-50px' }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      if (textRef.current) observer.observe(textRef.current);
      if (imageRef.current) observer.observe(imageRef.current);

      return () => observer.disconnect();
   }, []);

   const stats = [
      { number: '50+', label: 'Projects Completed' },
      { number: '5+', label: 'Years Experience' },
      { number: '100%', label: 'Client Satisfaction' },
   ];

   return (
      <section className='about' id='about' ref={sectionRef}>
         <div className='container'>
            <div className='about-content'>
               <div className='about-text' ref={textRef}>
                  <h2 className='about-title'>About Us</h2>
                  <div className='about-paragraphs'>
                     <p className='about-description'>
                        At <strong>Lunaris Digital</strong>, we believe in
                        designing with intention and coding with precision.
                        We're a team of passionate creatives and developers
                        dedicated to turning your vision into powerful digital
                        experiences.
                     </p>
                     <p className='about-description'>
                        From stunning websites to scalable apps, we deliver
                        results that blend creativity with performance. Our
                        process is simple: understand, build, refine — and
                        always exceed expectations.
                     </p>
                  </div>
               </div>

               <div className='about-visual' ref={imageRef}>
                  <div className='about-image-wrapper'>
                     <img
                        src={teamImg}
                        alt='Our team collaborating on a project at Lunaris Digital'
                        className='about-image'
                     />
                     <div className='image-overlay'></div>
                     <div className='image-decoration'></div>
                  </div>
               </div>
            </div>

            {/* Optional Stats Section */}
            <div className='about-stats'>
               {stats.map((stat, index) => (
                  <div
                     key={index}
                     className='stat-item'
                     style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                  >
                     <span className='stat-number'>{stat.number}</span>
                     <span className='stat-label'>{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default About;
