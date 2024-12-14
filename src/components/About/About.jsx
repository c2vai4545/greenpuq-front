import React from 'react';

const MissionSection = () => (
  <div className="about-mission">
    <h3>Nuestra Misión</h3>
    <p>
      Promover y facilitar la gestión sostenible de residuos en la región de Magallanes,
      contribuyendo a la preservación del medio ambiente y el desarrollo de nuestra comunidad.
    </p>
  </div>
);

const VisionSection = () => (
  <div className="about-vision">
    <h3>Nuestra Visión</h3>
    <p>
      Ser líderes en la implementación de soluciones innovadoras para la gestión de residuos,
      inspirando a la comunidad hacia un futuro más sostenible.
    </p>
  </div>
);

const ObjectivesSection = () => (
  <div className="about-objectives">
    <h3>Objetivos</h3>
    <ul>
      <li>Optimizar la gestión de residuos en la región</li>
      <li>Promover la educación ambiental</li>
      <li>Implementar tecnologías innovadoras</li>
      <li>Fomentar la participación comunitaria</li>
    </ul>
  </div>
);

const About = () => {
  return (
    <section className="about-section">
      <h2>Sobre el Proyecto</h2>
      <div className="about-container">
        <MissionSection />
        <VisionSection />
        <ObjectivesSection />
      </div>
    </section>
  );
};

export default About; 