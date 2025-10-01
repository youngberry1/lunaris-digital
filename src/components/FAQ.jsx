import { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const FAQS = [
   {
      question: 'What services do you offer?',
      answer:
         'We offer web design, development, branding, SEO, and ongoing digital strategy support.',
   },
   {
      question: 'How long does a project typically take?',
      answer:
         'Most projects range from 2 to 6 weeks depending on complexity and scope.',
   },
   {
      question: 'Do you work with startups or only big brands?',
      answer:
         "We love working with startups and established businesses alike—if you're passionate, we're in.",
   },
   {
      question: "What's your pricing structure?",
      answer:
         'We offer both fixed-price packages and custom quotes depending on your needs. Get in touch for a free consultation.',
   },
];

const FAQ = () => {
   const [openIndex, setOpenIndex] = useState(null);
   const sectionRef = useRef(null);
   const itemsRef = useRef([]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');

                  // Stagger animation for FAQ items
                  if (entry.target.classList.contains('faq-item')) {
                     const index = itemsRef.current.indexOf(entry.target);
                     entry.target.style.animationDelay = `${index * 0.1}s`;
                  }
               }
            });
         },
         { threshold: 0.2, rootMargin: '-50px' }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      itemsRef.current.forEach((item) => {
         if (item) observer.observe(item);
      });

      return () => observer.disconnect();
   }, []);

   const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   const addToItemsRef = (el, index) => {
      itemsRef.current[index] = el;
   };

   return (
      <section className='faq' id='faq' ref={sectionRef}>
         <div className='container'>
            <div className='faq-header'>
               <h2 className='faq-title'>Frequently Asked Questions</h2>
               <p className='faq-subtitle'>
                  Find answers to common questions about our services and
                  process.
               </p>
            </div>

            <div className='faq-container'>
               {FAQS.map((faq, index) => (
                  <div
                     key={index}
                     className='faq-item'
                     ref={(el) => addToItemsRef(el, index)}
                  >
                     <button
                        className={`faq-question ${
                           openIndex === index ? 'active' : ''
                        }`}
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={openIndex === index}
                     >
                        <span className='question-text'>{faq.question}</span>
                        <i
                           className={`fa-solid ${
                              openIndex === index ? 'fa-minus' : 'fa-plus'
                           }`}
                        ></i>
                     </button>
                     <div
                        className={`faq-answer ${
                           openIndex === index ? 'open' : ''
                        }`}
                     >
                        <div className='answer-content'>
                           <p>{faq.answer}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className='faq-cta'>
               <p>Still have questions? We're here to help!</p>
               <button
                  className='btn faq-cta-btn'
                  onClick={() =>
                     document
                        .getElementById('contact')
                        .scrollIntoView({ behavior: 'smooth' })
                  }
               >
                  <span>Contact Us</span>
                  <i className='fa-solid fa-message'></i>
               </button>
            </div>
         </div>
      </section>
   );
};

export default FAQ;
