import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-profile">
          <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
          <h3>{user?.name || "User"}</h3>
          <p>{user?.email || "user@example.com"}</p>
        </div>
        <div className="sidebar-menu">
          <Link to="/dashboard" className="menu-item active">
            <span className="menu-icon">📊</span>
            Dashboard
          </Link>
          <Link to="/catalogue" className="menu-item">
            <span className="menu-icon">📚</span>
            My Books
          </Link>
          <Link to="/wishlist" className="menu-item">
            <span className="menu-icon">❤️</span>
            Wishlist
          </Link>
          <Link to="/settings" className="menu-item">
            <span className="menu-icon">⚙️</span>
            Settings
          </Link>
        </div>
      </div>

      <div className="dashboard-content">
        <h1>Welcome to Your Bookstore Dashboard</h1>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Books Read</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Wishlist</h3>
            <p className="stat-number">0</p>
          </div>
        </div>

        {user && (
          <div className="user-details-card">
            <h2>Account Information</h2>
            <div className="user-info-grid">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="recommended-books">
          <h2>Recommended for You</h2>
          <div className="book-grid">
            <p>Book recommendations coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
