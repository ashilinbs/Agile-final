import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaUser, FaComments, FaArrowLeft } from 'react-icons/fa'; // added arrow icon for back button

function FeedbackApp() {
    const loggedInUserName = localStorage.getItem('name'); // Adjust based on your login flow

    const [view, setView] = useState('submit');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');
    const [userFeedback, setUserFeedback] = useState([]);
    const [allFeedback, setAllFeedback] = useState([]);

    // Submit Feedback
    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            if (!loggedInUserName) {
                setMessage('You must be logged in to submit feedback.');
                return;
            }

            const response = await axios.post('http://127.0.0.1:5000/feedback', { name: loggedInUserName, feedback });
            setMessage(response.data.message);
            setFeedback('');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error submitting feedback');
        }
    };

    // Fetch Feedback by User
    const handleFetchUserFeedback = async () => {
        try {
            if (!loggedInUserName) {
                setMessage('You must be logged in to view feedback.');
                return;
            }

            const response = await axios.get(`http://127.0.0.1:5000/feedback/${loggedInUserName}`);
            setUserFeedback(response.data.feedback);
            setMessage('');
        } catch (error) {
            setUserFeedback([]);
            setMessage(error.response?.data?.error || 'Error fetching user feedback');
        }
    };

    // Fetch All Feedback
    const handleFetchAllFeedback = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/feedback');
            setAllFeedback(response.data.feedback);
            setMessage('');
        } catch (error) {
            setAllFeedback([]);
            setMessage(error.response?.data?.error || 'Error fetching all feedback');
        }
    };

    // Go back to the previous page
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div style={{ fontFamily: 'Poppins, Arial, sans-serif', padding: '30px', backgroundColor: '#f4f6f9' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>Feedback Management System</h1>
                <nav style={{ marginBottom: '30px' }}>
                    <button
                        onClick={() => setView('submit')}
                        style={styles.navButton}
                    >
                        <FaPaperPlane style={{ marginRight: '8px' }} /> Submit Feedback
                    </button>
                    <button
                        onClick={() => setView('user')}
                        style={styles.navButton}
                    >
                        <FaUser style={{ marginRight: '8px' }} /> View User Feedback
                    </button>
                    <button
                        onClick={() => setView('all')}
                        style={styles.navButton}
                    >
                        <FaComments style={{ marginRight: '8px' }} /> View All Feedback
                    </button>
                </nav>

                {/* Back Button */}
                <button 
                    onClick={handleGoBack} 
                    style={{ ...styles.navButton, backgroundColor: '#e74c3c', marginTop: '20px' }}
                >
                    <FaArrowLeft style={{ marginRight: '8px' }} /> Go Back
                </button>

                {message && <p style={styles.message}>{message}</p>}

                {view === 'submit' && (
                    <div style={styles.card}>
                        <h2>Submit Your Feedback</h2>
                        {loggedInUserName ? (
                            <form onSubmit={handleSubmitFeedback}>
                                <textarea
                                    placeholder="Enter your feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    style={styles.textArea}
                                />
                                <button type="submit" style={styles.submitButton}>Submit</button>
                            </form>
                        ) : (
                            <p style={styles.loginMessage}>You must be logged in to submit feedback.</p>
                        )}
                    </div>
                )}

                {view === 'user' && (
                    <div style={styles.card}>
                        <h2>View Your Feedback</h2>
                        {loggedInUserName ? (
                            <>
                                <button
                                    onClick={handleFetchUserFeedback}
                                    style={styles.fetchButton}
                                >
                                    Fetch Feedback
                                </button>
                                <ul style={styles.feedbackList}>
                                    {userFeedback.map((fb) => (
                                        <li key={fb._id} style={styles.feedbackItem}>
                                            {fb.feedback} <em>({fb.timestamp})</em>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p style={styles.loginMessage}>You must be logged in to view feedback.</p>
                        )}
                    </div>
                )}

                {view === 'all' && (
                    <div style={styles.card}>
                        <h2>View All Feedback</h2>
                        <button
                            onClick={handleFetchAllFeedback}
                            style={styles.fetchButton}
                        >
                            Fetch All Feedback
                        </button>
                        <ul style={styles.feedbackList}>
                            {allFeedback.map((fb) => (
                                <li key={fb._id} style={styles.feedbackItem}>
                                    <strong>{fb.user}:</strong> {fb.feedback} <em>({fb.timestamp})</em>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

// Style object for better readability and consistency
const styles = {
    navButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    fetchButton: {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '20px',
    },
    message: {
        color: 'red',
        fontSize: '16px',
    },
    loginMessage: {
        color: '#e74c3c',
    },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    feedbackList: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    feedbackItem: {
        backgroundColor: '#ecf0f1',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
    }
};

export default FeedbackApp;
