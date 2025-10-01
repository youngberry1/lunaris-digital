import { useEffect, useRef, useState } from 'react';
import Glider from 'glider-js';
import 'glider-js/glider.min.css';
import './Testimonials.css';

// Import all images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.png';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';

const TESTIMONIALS = [
   {
      id: 1,
      image: img9,
      name: 'Sarah M.',
      role: 'Startup Founder',
      text: 'Lunaris Digital turned our vision into a stunning website that not only looks great but performs incredibly.',
   },
   {
      id: 2,
      image: img4,
      name: 'James L.',
      role: 'Marketing Director',
      text: 'They understood exactly what we needed — creative, fast, and professional from start to finish.',
   },
   {
      id: 3,
      image: img1,
      name: 'Amina R.',
      role: 'E-commerce Owner',
      text: 'Truly a team that cares about quality. Our traffic and engagement skyrocketed after launch.',
   },
   {
      id: 4,
      image: img3,
      name: 'David K.',
      role: 'Product Manager',
      text: 'The app development team exceeded our expectations and delivered ahead of schedule.',
   },
   {
      id: 5,
      image: img5,
      name: 'Linda W.',
      role: 'UX Designer',
      text: 'Great UI/UX strategy that really improved our user retention rates.',
   },
   {
      id: 6,
      image: img8,
      name: 'Mark B.',
      role: 'Creative Director',
      text: 'Their branding expertise gave our company a fresh, memorable identity.',
   },
   {
      id: 7,
      image: img7,
      name: 'Nina P.',
      role: 'Digital Marketer',
      text: 'SEO & Marketing strategies delivered measurable improvements in traffic and sales.',
   },
   {
      id: 8,
      image: img6,
      name: 'Abdul B.',
      role: 'Business Owner',
      text: 'Excellent communication and project management throughout the collaboration.',
   },
   {
      id: 9,
      image: img2,
      name: 'Emily T.',
      role: 'CEO',
      text: "The best digital agency we've worked with. Highly recommend Lunaris Digital!",
   },
];

const Testimonials = () => {
   const gliderRef = useRef(null);
   const gliderInstance = useRef(null);
   const [currentSlide, setCurrentSlide] = useState(0);
   const sectionRef = useRef(null);

   useEffect(() => {
      if (!gliderRef.current) return;

      const glider = new Glider(gliderRef.current, {
         slidesToShow: 1,
         slidesToScroll: 1,
         draggable: true,
         dots: '.dots',
         arrows: {
            prev: '.glider-prev',
            next: '.glider-next',
         },
         responsive: [
            {
               breakpoint: 768,
               settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
               breakpoint: 1024,
               settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
         ],
         scrollLock: true,
         rewind: true,
      });

      gliderInstance.current = glider;

      // Auto-slide functionality
      const autoSlideInterval = setInterval(() => {
         if (glider) {
            glider.scrollItem('next');
         }
      }, 5000);

      // Update current slide indicator
      const handleSlideVisible = (event) => {
         setCurrentSlide(event.detail.slide);
      };

      gliderRef.current.addEventListener(
         'glider-slide-visible',
         handleSlideVisible
      );

      // Intersection Observer for animations
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
               }
            });
         },
         { threshold: 0.2, rootMargin: '-50px' }
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      return () => {
         clearInterval(autoSlideInterval);
         if (gliderRef.current) {
            gliderRef.current.removeEventListener(
               'glider-slide-visible',
               handleSlideVisible
            );
         }
         if (glider.destroy) {
            glider.destroy();
         }
      };
   }, []);

   const StarRating = () => (
      <div className='testimonial-rating'>
         {[...Array(5)].map((_, i) => (
            <i key={i} className='fa-solid fa-star'></i>
         ))}
      </div>
   );

   const handleDotClick = (index) => {
      if (gliderInstance.current) {
         gliderInstance.current.scrollItem(index);
      }
   };

   const handlePrevClick = () => {
      if (gliderInstance.current) {
         gliderInstance.current.scrollItem('prev');
      }
   };

   const handleNextClick = () => {
      if (gliderInstance.current) {
         gliderInstance.current.scrollItem('next');
      }
   };

   return (
      <section className='testimonials' id='testimonials' ref={sectionRef}>
         <div className='container'>
            <div className='testimonials-header'>
               <h2 className='testimonials-title'>What Our Clients Say</h2>
               <p className='testimonials-subtitle'>
                  Feedback from those who've trusted Lunaris Digital.
               </p>
            </div>

            <div className='testimonials-carousel'>
               <div className='glider-contain'>
                  <div className='glider' ref={gliderRef}>
                     {TESTIMONIALS.map((testimonial) => (
                        <div key={testimonial.id} className='testimonial-card'>
                           <div className='testimonial-content'>
                              <div className='testimonial-avatar'>
                                 <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    onError={(e) => {
                                       e.target.src =
                                          'https://via.placeholder.com/80x80/667eea/ffffff?text=LD';
                                       e.target.alt = 'Default avatar';
                                    }}
                                 />
                                 <div className='avatar-border'></div>
                              </div>

                              <StarRating />

                              <blockquote className='testimonial-text'>
                                 "{testimonial.text}"
                              </blockquote>

                              <div className='testimonial-author'>
                                 <h4 className='testimonial-name'>
                                    {testimonial.name}
                                 </h4>
                                 <span className='testimonial-role'>
                                    {testimonial.role}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className='carousel-controls'>
                     <button
                        className='carousel-btn glider-prev'
                        onClick={handlePrevClick}
                        aria-label='Previous testimonial'
                     >
                        <i className='fa-solid fa-chevron-left'></i>
                     </button>

                     <div className='carousel-indicators'>
                        <div className='dots' role='tablist'>
                           {TESTIMONIALS.map((_, index) => (
                              <button
                                 key={index}
                                 className={`dot ${
                                    index === currentSlide ? 'active' : ''
                                 }`}
                                 onClick={() => handleDotClick(index)}
                                 aria-label={`Go to testimonial ${index + 1}`}
                              />
                           ))}
                        </div>
                     </div>

                     <button
                        className='carousel-btn glider-next'
                        onClick={handleNextClick}
                        aria-label='Next testimonial'
                     >
                        <i className='fa-solid fa-chevron-right'></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Testimonials;
