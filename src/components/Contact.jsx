import { useState, useRef, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });
   const [status, setStatus] = useState('idle');
   const [errors, setErrors] = useState({});

   const sectionRef = useRef(null);
   const formRef = useRef(null);

   const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_FORM_ID';

   useEffect(() => {
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

      if (sectionRef.current) observer.observe(sectionRef.current);
      if (formRef.current) observer.observe(formRef.current);

      return () => observer.disconnect();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: '',
         }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
         newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
         newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'Email is invalid';
      }

      if (!formData.message.trim()) {
         newErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
         newErrors.message = 'Message must be at least 10 characters long';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      setStatus('submitting');

      try {
         const response = await fetch(
            `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  message: formData.message,
                  _subject: `New Contact Form Submission from ${formData.name}`,
                  _replyto: formData.email,
               }),
            }
         );

         if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
               setStatus('idle');
            }, 5000);
         } else {
            throw new Error('Form submission failed');
         }
      } catch (error) {
         console.error('Form submission error:', error);
         setStatus('error');

         setTimeout(() => {
            setStatus('idle');
         }, 5000);
      }
   };

   const resetForm = () => {
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setStatus('idle');
   };

   return (
      <section className='contact' id='contact' ref={sectionRef}>
         <div className='container'>
            <div className='contact-content'>
               <div className='contact-info'>
                  <h2 className='contact-title'>Get in Touch</h2>
                  <p className='contact-description'>
                     We'd love to hear from you. Send us a message and we'll
                     respond promptly.
                  </p>

                  <div className='contact-methods'>
                     <div className='contact-method'>
                        <div className='method-icon'>
                           <i className='fa-solid fa-envelope'></i>
                        </div>
                        <div className='method-content'>
                           <h4>Email Us</h4>
                           <p>hello@lunarisdigital.com</p>
                        </div>
                     </div>

                     <div className='contact-method'>
                        <div className='method-icon'>
                           <i className='fa-solid fa-phone'></i>
                        </div>
                        <div className='method-content'>
                           <h4>Call Us</h4>
                           <p>+233 55 756 0911</p>
                        </div>
                     </div>

                     <div className='contact-method'>
                        <div className='method-icon'>
                           <i className='fa-solid fa-location-dot'></i>
                        </div>
                        <div className='method-content'>
                           <h4>Visit Us</h4>
                           <p>EV-1109-2112 Asamankese, Ghana - E/R</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='contact-form-wrapper' ref={formRef}>
                  {status === 'success' && (
                     <div className='form-status success'>
                        <i className='fa-solid fa-check-circle'></i>
                        <span>
                           Thank you! Your message has been sent successfully.
                           We'll get back to you soon.
                        </span>
                     </div>
                  )}

                  {status === 'error' && (
                     <div className='form-status error'>
                        <i className='fa-solid fa-exclamation-circle'></i>
                        <span>
                           Sorry, there was an error sending your message.
                           Please try again or contact us directly.
                        </span>
                     </div>
                  )}

                  <form
                     className='contact-form'
                     onSubmit={handleSubmit}
                     noValidate
                  >
                     <div className='form-group'>
                        <label htmlFor='name'>Your Name *</label>
                        <input
                           type='text'
                           name='name'
                           id='name'
                           value={formData.name}
                           onChange={handleChange}
                           className={errors.name ? 'error' : ''}
                           disabled={status === 'submitting'}
                           placeholder='Enter your full name'
                        />
                        {errors.name && (
                           <span className='error-message'>{errors.name}</span>
                        )}
                     </div>

                     <div className='form-group'>
                        <label htmlFor='email'>Your Email *</label>
                        <input
                           type='email'
                           name='email'
                           id='email'
                           value={formData.email}
                           onChange={handleChange}
                           className={errors.email ? 'error' : ''}
                           disabled={status === 'submitting'}
                           placeholder='Enter your email address'
                        />
                        {errors.email && (
                           <span className='error-message'>{errors.email}</span>
                        )}
                     </div>

                     <div className='form-group'>
                        <label htmlFor='message'>Your Message *</label>
                        <textarea
                           name='message'
                           id='message'
                           rows='5'
                           value={formData.message}
                           onChange={handleChange}
                           className={errors.message ? 'error' : ''}
                           disabled={status === 'submitting'}
                           placeholder='Tell us about your project or inquiry...'
                        ></textarea>
                        {errors.message && (
                           <span className='error-message'>
                              {errors.message}
                           </span>
                        )}
                     </div>

                     <div className='form-actions'>
                        <button
                           type='submit'
                           className='btn submit-btn'
                           disabled={status === 'submitting'}
                        >
                           {status === 'submitting' ? (
                              <>
                                 <i className='fa-solid fa-spinner fa-spin'></i>
                                 Sending...
                              </>
                           ) : (
                              <>
                                 <i className='fa-solid fa-paper-plane'></i>
                                 Send Message
                              </>
                           )}
                        </button>

                        <button
                           type='button'
                           className='reset-btn'
                           onClick={resetForm}
                           disabled={status === 'submitting'}
                        >
                           Clear Form
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
