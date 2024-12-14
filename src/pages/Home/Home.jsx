import React from 'react';
import Welcome from '../../components/Welcome/Welcome.jsx';
import About from '../../components/About/About.jsx';
import Contact from '../../components/Contact/Contact.jsx';

const Home = () => {
  return (
    <div className="home">
      <Welcome />
      <About />
      <Contact />
    </div>
  );
};

export default Home; 