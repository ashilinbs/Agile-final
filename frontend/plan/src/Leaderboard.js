import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';
import Particles from 'react-tsparticles';
import { useNavigate } from 'react-router-dom';
import './PredictedHistory.css';

const PredictedHistory = () => {
  const [predictedHistory, setPredictedHistory] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem('name');

  useEffect(() => {
    const fetchPredictedHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/predicted_history/${username}`);
        setPredictedHistory(response.data.predicted_history);
      } catch (error) {
        setError('Error fetching predicted history');
        console.error(error);
      }
    };

    if (username) {
      fetchPredictedHistory();
    } else {
      setError('Username not found in localStorage');
    }
  }, [username]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const caloriesData = predictedHistory.map(entry => entry.calories);
  const exerciseLabels = predictedHistory.map((entry, index) => `Prediction ${index + 1}`);

  const chartData = {
    labels: exerciseLabels,
    datasets: [
      {
        label: 'Calories Burned',
        data: caloriesData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="history-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>

      <div className="sticker sticker-right"></div>
      
      <Particles
        id="tsparticles"
        options={{
          particles: {
            number: {
              value: 30,
            },
            size: {
              value: 5,
            },
            move: {
              speed: 1,
            },
            opacity: {
              value: 0.6,
            },
            color: {
              value: '#76c7c0',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
            },
          },
        }}
      />

      <h2>Your Predicted History</h2>

      {predictedHistory.length === 0 ? (
        <div className="no-history-message">No predicted history available.</div>
      ) : (
        <div className="chart-card">
          <Bar data={chartData} options={{ animation: { duration: 2000 } }} />
          <div className="predicted-history-list">
            {predictedHistory.map((entry, index) => (
              <div key={index} className="history-item">
                <div className="prediction-info">
                  <h3>Prediction {index + 1}</h3>
                  <p><strong>Calories:</strong> {entry.calories.toFixed(2)}</p>
                  <p><strong>Recommended Exercise:</strong> {entry.exercise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictedHistory;
