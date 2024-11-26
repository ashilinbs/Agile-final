import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { FaAppleAlt, FaHamburger, FaPizzaSlice } from 'react-icons/fa'; // Import icons for top content
import Navbar from './Navbar'; // Import Navbar component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel default styles
import './Home.css'; // Custom styles

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      
      <Navbar />

      {/* Top Content Section */}
      <div className="top-content">
        <div className="icon-row">
          <FaAppleAlt className="top-icon" />
          <FaHamburger className="top-icon" />
          <FaPizzaSlice className="top-icon" />
        </div>
        <h2 className="welcome-heading">Welcome to Snackaroo!</h2>
        <p className="intro-text">
          <strong>Your one-stop destination for all your favorite snacks, juicy burgers, fresh fruits, and more.</strong>
          <br />
          <strong>Indulge in a world of mouth-watering treats, perfect for any time of the day.</strong>
        </p>
        <p className="tagline">
          <strong>Explore our wide variety of delicious food and discover your new favorite bite!</strong>
        </p>
      </div>

      {/* Website Name with Emojis and Animation */}
      <h1 className="website-name animated-text">
        🍔🍟 Snackaroo 🍕🍩
      </h1>

      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="carousel"
      >
        <div>
          <img
            src="https://media.istockphoto.com/id/1273378551/photo/set-of-summer-fruits-and-berries-in-wooden-serving.jpg?s=1024x1024&w=is&k=20&c=6cuBvrVdGYtybOk7XQnagg_JPBLzxAnk6vSgxZaHbYE="
            alt="Summer Fruits"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2024/05/18/10/13/cheese-burger-8770017_640.png"
            alt="Cheese Burger"
          />
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=1024x1024&w=is&k=20&c=QPHFTWoscwMSXOEGKoAKOjlCnMGszppFBrqQHdy4EGc="
            alt="Brunch Together"
          />
        </div>
      </Carousel>

      {/* Heading for the page */}
    </div>
  );
};

export default Home;
