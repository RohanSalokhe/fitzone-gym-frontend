import React, { useState } from "react";
import "./plans.css";

function Plans() {

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      duration: "1 Month",
      price: 1000,
      description: "Basic gym access",
      status: "Active"
    },
    {
      id: 2,
      name: "Standard Plan",
      duration: "3 Months",
      price: 2500,
      description: "Gym access + Cardio",
      status: "Active"
    },
    {
      id: 3,
      name: "Premium Plan",
      duration: "6 Months",
      price: 4500,
      description: "Gym + Cardio + Personal Training",
      status: "Active"
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlan = {
      id: plans.length + 1,
      name: formData.name,
      duration: formData.duration,
      price: Number(formData.price),
      description: formData.description,
      status: "Active"
    };

    setPlans([...plans, newPlan]);

    setFormData({
      name: "",
      duration: "",
      price: "",
      description: ""
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPlans(
      plans.filter((plan) => plan.id !== id)
    );
  };

  return (

    <div className="plans-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="plans-header">

        <div>
          <h1>Membership Plans</h1>
          <p>Manage gym membership plans</p>
        </div>

        <button
          className="add-plan-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Plan
        </button>

      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="plans-stats">

        <div className="plan-stat-card">

          <div className="plan-stat-icon">
            📋
          </div>

          <div>
            <h3>{plans.length}</h3>
            <p>Total Plans</p>
          </div>

        </div>


        <div className="plan-stat-card">

          <div className="plan-stat-icon">
            ✅
          </div>

          <div>
            <h3>
              {plans.filter(
                (plan) => plan.status === "Active"
              ).length}
            </h3>

            <p>Active Plans</p>
          </div>

        </div>


        <div className="plan-stat-card">

          <div className="plan-stat-icon">
            ₹
          </div>

          <div>
            <h3>
              ₹
              {plans.length > 0
                ? Math.min(
                    ...plans.map((plan) => plan.price)
                  ).toLocaleString("en-IN")
                : 0}
            </h3>

            <p>Starting Price</p>
          </div>

        </div>

      </div>


      {/* =========================
          ADD PLAN FORM
      ========================= */}

      {showForm && (

        <div className="plan-form-container">

          <div className="plan-form-header">

            <h2>Add New Membership Plan</h2>

            <button
              className="plan-close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="plan-form-grid">

              {/* Plan Name */}

              <div className="plan-form-group">

                <label>Plan Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter plan name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Duration */}

              <div className="plan-form-group">

                <label>Duration</label>

                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Duration
                  </option>

                  <option value="1 Month">
                    1 Month
                  </option>

                  <option value="3 Months">
                    3 Months
                  </option>

                  <option value="6 Months">
                    6 Months
                  </option>

                  <option value="12 Months">
                    12 Months
                  </option>

                </select>

              </div>


              {/* Price */}

              <div className="plan-form-group">

                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Description */}

              <div className="plan-form-group">

                <label>Description</label>

                <input
                  type="text"
                  name="description"
                  placeholder="Enter plan description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="plan-form-buttons">

              <button
                type="button"
                className="plan-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="plan-save-btn"
              >
                Save Plan
              </button>

            </div>

          </form>

        </div>

      )}


      {/* =========================
          PLAN CARDS
      ========================= */}

      <div className="plans-container">

        {plans.map((plan) => (

          <div
            className="membership-card"
            key={plan.id}
          >

            <div className="membership-card-top">

              <div>

                <h2>{plan.name}</h2>

                <span className="plan-duration">
                  {plan.duration}
                </span>

              </div>

              <span className="active-badge">
                {plan.status}
              </span>

            </div>


            <div className="plan-price">

              <span>₹</span>
              {plan.price.toLocaleString("en-IN")}

            </div>


            <p className="plan-description">
              {plan.description}
            </p>


            <div className="plan-divider"></div>


            <div className="plan-details">

              <div>
                <span>Duration</span>
                <strong>{plan.duration}</strong>
              </div>

              <div>
                <span>Plan ID</span>
                <strong>#{plan.id}</strong>
              </div>

            </div>


            <div className="plan-actions">

              <button className="plan-edit-btn">
                ✏️ Edit
              </button>

              <button
                className="plan-delete-btn"
                onClick={() => handleDelete(plan.id)}
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Plans;