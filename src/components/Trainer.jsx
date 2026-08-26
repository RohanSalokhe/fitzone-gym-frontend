import React, { useState } from "react";
import "./Trainer.css";

function Trainer() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Rahul Patil",
      mobile: "9876543210",
      email: "rahul@gmail.com",
      specialization: "Weight Training",
      experience: "5 Years",
      salary: "25000",
    },
    {
      id: 2,
      name: "Amit Shinde",
      mobile: "9876501234",
      email: "amit@gmail.com",
      specialization: "Cardio",
      experience: "3 Years",
      salary: "22000",
    },
    {
      id: 3,
      name: "Sneha Jadhav",
      mobile: "9988776655",
      email: "sneha@gmail.com",
      specialization: "Yoga & Fitness",
      experience: "4 Years",
      salary: "24000",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    specialization: "",
    experience: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrainer = {
      id: trainers.length + 1,
      ...formData,
    };

    setTrainers([...trainers, newTrainer]);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      specialization: "",
      experience: "",
      salary: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== id
    );

    setTrainers(updatedTrainers);
  };

  return (
    <div className="trainer-page">

      {/* Header */}
      <div className="trainer-header">
        <div>
          <h1>Trainers</h1>
          <p>Manage your gym trainers</p>
        </div>

        <button
          className="add-trainer-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Trainer
        </button>
      </div>

      {/* Statistics */}
      <div className="trainer-stats">

        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div>
            <h3>{trainers.length}</h3>
            <p>Total Trainers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div>
            <h3>8</h3>
            <p>Specializations</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div>
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>

      </div>

      {/* Add Trainer Form */}
      {showForm && (
        <div className="form-container">

          <div className="form-header">
            <h2>Add New Trainer</h2>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Trainer Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter trainer name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Specialization</label>

                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select specialization</option>
                  <option value="Weight Training">
                    Weight Training
                  </option>
                  <option value="Cardio">
                    Cardio
                  </option>
                  <option value="Yoga & Fitness">
                    Yoga & Fitness
                  </option>
                  <option value="CrossFit">
                    CrossFit
                  </option>
                  <option value="Personal Training">
                    Personal Training
                  </option>
                </select>

              </div>

              <div className="form-group">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  placeholder="Example: 3 Years"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">
                <label>Salary</label>

                <input
                  type="number"
                  name="salary"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Trainer
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Trainer Table */}
      <div className="trainer-table-container">

        <div className="table-title">
          <h2>Trainer List</h2>
          <span>{trainers.length} Trainers</span>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Trainer</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {trainers.map((trainer) => (

                <tr key={trainer.id}>

                  <td>
                    <span className="trainer-id">
                      #{trainer.id}
                    </span>
                  </td>

                  <td>
                    <div className="trainer-name">

                      <div className="trainer-avatar">
                        {trainer.name.charAt(0)}
                      </div>

                      <span>{trainer.name}</span>

                    </div>
                  </td>

                  <td>{trainer.mobile}</td>

                  <td>{trainer.email}</td>

                  <td>
                    <span className="specialization">
                      {trainer.specialization}
                    </span>
                  </td>

                  <td>{trainer.experience}</td>

                  <td>
                    ₹{Number(trainer.salary).toLocaleString("en-IN")}
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button className="edit-btn">
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(trainer.id)}
                      >
                        🗑️
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Trainer;