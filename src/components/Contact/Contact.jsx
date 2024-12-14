import React from 'react';

const ContactSection = () => (
  <div className="contact-content">
    <h3>Información de Contacto</h3>
    <div className="contact-details">
      <p>Correo: contacto@greenpuq.cl</p>
      <p>Teléfono: +56 9 1234 5678</p>
      <p>Dirección: Av. Principal 123, Punta Arenas</p>
    </div>
  </div>
);

const ContactForm = () => (
  <form className="contact-form">
    <div className="form-group">
      <label htmlFor="name">Nombre</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Correo</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div className="form-group">
      <label htmlFor="message">Mensaje</label>
      <textarea id="message" name="message" rows="4" required />
    </div>
    <button type="submit" className="submit-btn">Enviar Mensaje</button>
  </form>
);

const Contact = () => {
  return (
    <section className="contact-section">
      <h2>Contacto</h2>
      <div className="contact-container">
        <ContactSection />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact; 