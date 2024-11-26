import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DailyMission from './DailyMission';
import MealPlan from './MealPlan';
import Leaderboard from './Leaderboard';
import Home from './Home';
import Login from './Login';
import './App.css';
import Register from './Register';
import Profile from './Profile';
import Clanning from './Clanning';
import AddMealPlan from './AddMealPlan';
import ShoppingList from './ShoppingList';
import MarkIngredient from './MarkIngredient';
import Feedback from './Feedback';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar is inside HomePage and displayed on every page */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/daily-mission" element={<DailyMission />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />  {/* Corrected this line */}
          <Route path="/food" element={<Clanning/>}/>
          <Route path="/add" element={<AddMealPlan/>}/>
      
          <Route path="/feedback" element={<Feedback/>}/>


          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
