import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // For storing the selected image

  // Fetch profile data on component mount
  useEffect(() => {
    const username = localStorage.getItem('name');

    if (!username) {
      setError('Username not found in local storage');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/profile/${username}`);
        console.log('Profile data:', response.data); // Check the API response
        setProfile(response.data.profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  // Logout function to remove the user from local storage and redirect
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Toggle between showing profile or dashboard
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const imageUrl = event.target.value;  // Get the URL from input
    console.log("Image URL entered:", imageUrl);  // Check the URL value
  
    if (!imageUrl) {
      console.error("No image URL provided");
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/upload-profile-picture', {
        imageUrl: imageUrl,  // Send the URL to the backend
        name: localStorage.getItem('name')  // Ensure the username is sent to associate with the profile
      });
      console.log('Image URL upload response:', response.data);
      setProfile(prevProfile => ({
        ...prevProfile,
        image: response.data.imageUrl || prevProfile.image  // Update the profile image URL
      }));
    } catch (error) {
      console.error('Error uploading image URL:', error);
      setError('Error uploading image URL');
    }
  };
  
  
  return (
    <div className="dashboard">
      <nav className="navbar">
        <Link to="/meal-plan">Calorie Prediction</Link>
        <Link to="/daily-mission">Tutorials</Link>
        <Link to="/leaderboard">Dashboard</Link>
        <Link to="/food">Diet plan</Link>
        <Link to="/add">NutritionData</Link>
        <Link to="/feedback">feedback</Link>
       

        <button onClick={toggleProfile} className="profile-btn">
          {profile ? `Signed in as ${profile.name}` : 'Profile'}
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="content">
        {showProfile ? (
          <div className="profile-box">
            <h2>User Profile</h2>
            {error ? (
              <p>{error}</p>
            ) : (
              profile && (
                <div>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  {/* Display Profile Picture */}
                  {profile.image && <img src={profile.image} alt="Profile" className="profile-image" />}
                  <input 
  type="text" 
  placeholder="Paste image URL here" 
  onChange={handleImageUpload} 
/>
                </div>
              )
            )}
          </div>
        ) : (
          <>
            <h1>Welcome, {profile ? profile.name : 'User'}!</h1>

            {/* Dashboard sections */}
            <section className="overview">
              <h2>Dashboard Overview</h2>
              <p>Track your health journey with personalized meal plans, daily missions, and progress metrics. Every step counts as you move towards a healthier you!</p>
            </section>

            {/* User Statistics Section */}
            <section className="statistics">
              <h2>Your Progress</h2>
              <div className="stats-container">
                <div className="stat-item">
                  <h3>Meals Logged</h3>
                  <p>45</p>
                </div>
                <div className="stat-item">
                  <h3>Missions Completed</h3>
                  <p>30</p>
                </div>
                <div className="stat-item">
                  <h3>Leaderboard Rank</h3>
                  <p>#7</p>
                </div>
                <div className="stat-item">
                  <h3>Calories Burned</h3>
                  <p>1,200 kcal</p>
                </div>
              </div>
            </section>

            {/* Goal Tracker Section */}
            <section className="goal-tracker">
              <h2>Your Goal Tracker</h2>
              <p>Stay motivated by tracking your personal goals:</p>
              <ul>
                <li>Goal 1: Lose 5 kg by the end of the month.</li>
                <li>Goal 2: Complete 15 daily missions this week.</li>
                <li>Goal 3: Log meals consistently for 7 days in a row.</li>
              </ul>
            </section>

            {/* Image Gallery */}
            <div className="image-container">
              <img src="https://media.istockphoto.com/id/857137202/photo/red-apple-dark-blue-grapes-green-apple-yellow-pear-green-grapes-orange-peach-in-a-wooden-box.jpg?s=612x612&w=0&k=20&c=_HBzEYADngtnrRoEZL1axGaqc2Hkm1DW91LPVj9Zuwc=" alt="Healthy Food" className="image-1"/>
              <img src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=" alt="Fitness" className="image-2"/>
              <img src="https://media.istockphoto.com/id/1154731746/photo/cheeseburger-with-cola-and-french-fries.jpg?s=612x612&w=0&k=20&c=DfuI7KyMDIF8_JH66oAhIZLOgL4RRXulfv24PQ5vTEo=" alt="Wellness" className="image-3"/>
            </div>

            {/* Tips & Insights Section */}
            <section className="tips-insights">
              <h2>Health Tips & Insights</h2>
              <p>Explore expert tips to enhance your wellness journey:</p>
              <ul>
                <li><strong>Hydration:</strong> Drinking 2-3 liters of water daily boosts metabolism and aids digestion.</li>
                <li><strong>Mindful Eating:</strong> Take time to enjoy each bite. Eating slowly can help reduce overeating.</li>
                <li><strong>Sleep Quality:</strong> Aim for 7-8 hours of quality sleep each night to recharge your body and mind.</li>
              </ul>
            </section>

            {/* Motivational Quote Section */}
            <section className="quote-section">
              <blockquote>
                “Your health is an investment, not an expense. Keep going, you are closer to your goals every day!”
              </blockquote>
            </section>

            {/* Back to Homepage Button */}
            <button onClick={() => navigate('/')} className="back-btn">Back to Homepage</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
