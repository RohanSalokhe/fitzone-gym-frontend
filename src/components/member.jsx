import React, { useEffect, useState } from "react";
import "./member.css";

const API_URL = "https://fitzone-gym-backend.onrender.com";

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

      const adminId = localStorage.getItem("adminId");

      if (!adminId) {
        alert("Admin session not found. Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/members`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "adminId": adminId,
        },
      });

      const data = await response.json();

      console.log("Members Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch members"
        );
      }

      setMembers(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Fetch Members Error:", error);

      alert(
        error.message || "Unable to load members"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD MEMBERS WHEN PAGE OPENS
  // ==========================================

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


    // ==========================================
    // VALIDATION
    // ==========================================

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

      const adminId = localStorage.getItem("adminId");


      // ==========================================
      // CHECK ADMIN LOGIN
      // ==========================================

      if (!adminId) {

        alert(
          "Admin session not found. Please login again."
        );

        return;

      }


      // ==========================================
      // POST MEMBER
      // ==========================================

      const response = await fetch(`${API_URL}/members`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "adminId": adminId,

        },

        body: JSON.stringify({

          memberName: formData.memberName,

          phone: formData.phone,

          age: Number(formData.age),

          gender: formData.gender,

          plan: formData.plan,

        }),

      });


      const data = await response.json();


      console.log("Add Member Response:", data);


      // ==========================================
      // ERROR
      // ==========================================

      if (!response.ok) {

        alert(
          data.message ||
          data.error ||
          "Failed to add member"
        );

        return;

      }


      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        `Member added successfully!\n\nMember ID: ${data.memberId || "Generated"}`
      );


      // ==========================================
      // CLEAR FORM
      // ==========================================

      setFormData({

        memberName: "",
        phone: "",
        age: "",
        gender: "",
        plan: "",

      });


      // ==========================================
      // REFRESH MEMBERS
      // ==========================================

      fetchMembers();


    } catch (error) {

      console.error(
        "Add Member Error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
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

          <h1>
            Members
          </h1>

          <p>
            Manage your gym members
          </p>

        </div>


        <div className="member-count">

          <span>
            {members.length}
          </span>

          <small>
            Total Members
          </small>

        </div>

      </div>


      {/* =====================================
          ADD MEMBER FORM
      ====================================== */}

      <div className="member-form-card">

        <h2>
          Add New Member
        </h2>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">


            {/* MEMBER NAME */}

            <div className="form-group">

              <label>
                Member Name
              </label>

              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="Enter member name"
                required
              />

            </div>


            {/* MOBILE NUMBER */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="10"
                required
              />

            </div>


            {/* AGE */}

            <div className="form-group">

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="10"
                max="100"
                required
              />

            </div>


            {/* GENDER */}

            <div className="form-group">

              <label>
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
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


            {/* MEMBERSHIP PLAN */}

            <div className="form-group">

              <label>
                Membership Plan
              </label>

              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
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


          {/* ADD BUTTON */}

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

            <h2>
              All Members
            </h2>

            <p>
              Registered gym members
            </p>

          </div>


          <button
            className="refresh-btn"
            onClick={fetchMembers}
          >

            ↻ Refresh

          </button>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="loading">
            Loading members...
          </div>


        ) : members.length === 0 ? (


          /* NO MEMBERS */

          <div className="no-members">

            <div>
              👥
            </div>

            <h3>
              No Members Found
            </h3>

            <p>
              Add your first gym member above.
            </p>

          </div>


        ) : (


          /* MEMBERS TABLE */

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Member ID
                  </th>

                  <th>
                    Member Name
                  </th>

                  <th>
                    Mobile Number
                  </th>

                  <th>
                    Age
                  </th>

                  <th>
                    Gender
                  </th>

                  <th>
                    Membership Plan
                  </th>

                </tr>

              </thead>


              <tbody>

                {members.map((member) => (

                  <tr
                    key={member.memberId}
                  >

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