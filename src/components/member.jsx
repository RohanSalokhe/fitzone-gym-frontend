import React, { useEffect, useState } from "react";
import "./member.css";

const API_URL = "http://localhost:5005";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    memberName: "",
    phone: "",
    age: "",
    gender: "",
    plan: "",
  });

  // ==========================================
  // GET ALL MEMBERS
  // ==========================================

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/members`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch members");
      }

      setMembers(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Fetch Members Error:", error);
      alert("Unable to load members");
    } finally {
      setLoading(false);
    }
  };

  // Load members when page opens
  useEffect(() => {
    fetchMembers();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD MEMBER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.memberName ||
      !formData.phone ||
      !formData.age ||
      !formData.gender ||
      !formData.plan
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName: formData.memberName,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          plan: formData.plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add member");
        return;
      }

      alert(
        `Member added successfully!\nMember ID: ${data.memberId}`
      );

      // Clear form
      setFormData({
        memberName: "",
        phone: "",
        age: "",
        gender: "",
        plan: "",
      });

      // Refresh table
      fetchMembers();

    } catch (error) {
      console.error("Add Member Error:", error);

      alert(
        "Server connection failed. Make sure backend is running on port 5005."
      );
    }
  };

  return (
    <div className="member-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="member-header">

        <div>
          <h1>Members</h1>
          <p>Manage your gym members</p>
        </div>

        <div className="member-count">
          <span>{members.length}</span>
          <small>Total Members</small>
        </div>

      </div>


      {/* =====================================
          ADD MEMBER FORM
      ====================================== */}

      <div className="member-form-card">

        <h2>Add New Member</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Member Name */}
            <div className="form-group">

              <label>Member Name</label>

              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="Enter member name"
              />

            </div>


            {/* Mobile Number */}
            <div className="form-group">

              <label>Mobile Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="10"
              />

            </div>


            {/* Age */}
            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
              />

            </div>


            {/* Gender */}
            <div className="form-group">

              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* Membership Plan */}
            <div className="form-group">

              <label>Membership Plan</label>

              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              >

                <option value="">
                  Select Membership Plan
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

          </div>


          <button
            type="submit"
            className="add-member-btn"
          >
            + Add Member
          </button>

        </form>

      </div>


      {/* =====================================
          ALL MEMBERS
      ====================================== */}

      <div className="members-table-card">

        <div className="table-header">

          <div>
            <h2>All Members</h2>
            <p>Registered gym members</p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchMembers}
          >
            ↻ Refresh
          </button>

        </div>


        {/* Loading */}

        {loading ? (

          <div className="loading">
            Loading members...
          </div>

        ) : members.length === 0 ? (

          /* No Members */

          <div className="no-members">

            <div>👥</div>

            <h3>No Members Found</h3>

            <p>
              Add your first gym member above.
            </p>

          </div>

        ) : (

          /* Members Table */

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Membership Plan</th>
                </tr>

              </thead>

              <tbody>

                {members.map((member) => (

                  <tr key={member.memberId}>

                    <td className="member-id">
                      {member.memberId}
                    </td>

                    <td className="member-name">
                      {member.memberName}
                    </td>

                    <td>
                      {member.phone}
                    </td>

                    <td>
                      {member.age}
                    </td>

                    <td>
                      {member.gender}
                    </td>

                    <td>

                      <span className="plan-badge">
                        {member.plan}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}