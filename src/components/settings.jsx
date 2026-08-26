import React, { useState } from "react";
import "./settings.css";

function Settings() {

  const [gymName, setGymName] = useState("FitZone Gym");
  const [email, setEmail] = useState("fitzone@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState(
    "Kolhapur, Maharashtra"
  );

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [message, setMessage] = useState("");


  const handleSave = (e) => {

    e.preventDefault();

    setMessage(
      "Settings saved successfully!"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };


  return (

    <div className="settings-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="settings-header">

        <div>

          <h1>Settings</h1>

          <p>
            Manage your gym settings and preferences
          </p>

        </div>

      </div>


      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {message && (

        <div className="settings-success">
          ✓ {message}
        </div>

      )}


      <div className="settings-layout">

        {/* =========================
            SIDEBAR
        ========================= */}

        <div className="settings-menu">

          <div className="settings-menu-item active">
            ⚙️
            <span>General Settings</span>
          </div>

          <div className="settings-menu-item">
            🔔
            <span>Notifications</span>
          </div>

          <div className="settings-menu-item">
            🔐
            <span>Security</span>
          </div>

          <div className="settings-menu-item">
            👤
            <span>Profile</span>
          </div>

        </div>


        {/* =========================
            SETTINGS CONTENT
        ========================= */}

        <div className="settings-content">

          {/* GENERAL SETTINGS */}

          <div className="settings-card">

            <div className="settings-card-header">

              <h2>
                General Settings
              </h2>

              <p>
                Update your gym information
              </p>

            </div>


            <form onSubmit={handleSave}>

              <div className="settings-form-grid">

                {/* Gym Name */}

                <div className="settings-form-group">

                  <label>
                    Gym Name
                  </label>

                  <input
                    type="text"
                    value={gymName}
                    onChange={(e) =>
                      setGymName(e.target.value)
                    }
                  />

                </div>


                {/* Email */}

                <div className="settings-form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </div>


                {/* Phone */}

                <div className="settings-form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />

                </div>


                {/* Address */}

                <div className="settings-form-group">

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                  />

                </div>

              </div>


              <div className="settings-save-area">

                <button
                  type="submit"
                  className="settings-save-btn"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>


          {/* =========================
              NOTIFICATION SETTINGS
          ========================= */}

          <div className="settings-card">

            <div className="settings-card-header">

              <h2>
                Notification Settings
              </h2>

              <p>
                Manage your notification preferences
              </p>

            </div>


            <div className="notification-setting">

              <div>

                <h3>
                  Push Notifications
                </h3>

                <p>
                  Receive notifications about gym activities
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(!notifications)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            <div className="notification-setting">

              <div>

                <h3>
                  Email Notifications
                </h3>

                <p>
                  Receive important updates by email
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>


          {/* =========================
              SECURITY
          ========================= */}

          <div className="settings-card">

            <div className="settings-card-header">

              <h2>
                Security
              </h2>

              <p>
                Manage your account security
              </p>

            </div>


            <div className="security-row">

              <div>

                <h3>
                  Change Password
                </h3>

                <p>
                  Update your account password
                </p>

              </div>

              <button className="security-btn">
                Change Password
              </button>

            </div>


            <div className="security-row">

              <div>

                <h3>
                  Two-Factor Authentication
                </h3>

                <p>
                  Add an extra layer of account security
                </p>

              </div>

              <button className="security-btn">
                Enable
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Settings;