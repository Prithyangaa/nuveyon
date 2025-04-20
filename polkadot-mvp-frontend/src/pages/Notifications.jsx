import { useState, useEffect } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../services/api';

function Notifications() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Load user and fetch notifications
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchNotifications(parsedUser.polkadotId).then((data) => {
        setNotifications(data.notifications || []);
      }).catch((error) => {
        console.error('Error fetching notifications:', error);
      });
    }
  }, []);

  // Handle mark as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await markNotificationAsRead(notificationId);
      setNotifications(notifications.map(n => n._id === notificationId ? response.notification : n));
      alert(response.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error marking notification as read');
    }
  };

  if (!user) {
    return (
      <div className="text-center my-4">
        <h2>Please connect your wallet to view notifications.</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className="list-group">
          {notifications.map(notification => (
            <div
              key={notification._id}
              className={`list-group-item ${notification.isRead ? 'list-group-item-secondary' : ''}`}
            >
              <p>{notification.message}</p>
              <small className="text-muted">
                {new Date(notification.createdAt).toLocaleString()}
              </small>
              {!notification.isRead && (
                <button
                  className="btn btn-sm btn-outline-primary ms-2"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;