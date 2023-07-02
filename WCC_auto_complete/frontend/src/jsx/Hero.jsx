import React, { Component } from 'react';
import '../css/Hero.css';

class Hero extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to My App!</h2>
        <p>This is the hero section of the application.</p>
        <div className='resultat'></div>
      </div>
    );
  }
}

export default Hero;
