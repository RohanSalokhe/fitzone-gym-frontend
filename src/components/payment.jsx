import React, { useState } from "react";
import "./payment.css";

function Payment() {

  const [payments, setPayments] = useState([
    {
      id: 1,
      memberId: "M001",
      memberName: "Rahul Patil",
      amount: 2500,
      paymentDate: "2026-08-20",
      paymentMethod: "UPI",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      memberId: "M002",
      memberName: "Amit Shinde",
      amount: 4500,
      paymentDate: "2026-08-21",
      paymentMethod: "Cash",
      paymentStatus: "Paid"
    },
    {
      id: 3,
      memberId: "M003",
      memberName: "Sneha Jadhav",
      amount: 1000,
      paymentDate: "2026-08-22",
      paymentMethod: "Card",
      paymentStatus: "Pending"
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    paymentStatus: ""
  });


  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  /* =========================
     ADD PAYMENT
  ========================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    const newPayment = {
      id: payments.length + 1,
      ...formData,
      amount: Number(formData.amount)
    };

    setPayments([
      ...payments,
      newPayment
    ]);

    setFormData({
      memberId: "",
      memberName: "",
      amount: "",
      paymentDate: "",
      paymentMethod: "",
      paymentStatus: ""
    });

    setShowForm(false);

  };


  /* =========================
     DELETE PAYMENT
  ========================= */

  const handleDelete = (id) => {

    setPayments(
      payments.filter(
        (payment) => payment.id !== id
      )
    );

  };


  /* =========================
     TOTAL AMOUNT
  ========================= */

  const totalAmount = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount),
    0
  );


  const paidPayments = payments.filter(
    (payment) =>
      payment.paymentStatus === "Paid"
  ).length;


  const pendingPayments = payments.filter(
    (payment) =>
      payment.paymentStatus === "Pending"
  ).length;


  return (

    <div className="payment-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="payment-header">

        <div>

          <h1>Payments</h1>

          <p>
            Manage gym membership payments
          </p>

        </div>

        <button
          className="add-payment-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Payment
        </button>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="payment-stats">

        <div className="payment-stat-card">

          <div className="payment-stat-icon">
            ₹
          </div>

          <div>

            <h3>
              ₹{totalAmount.toLocaleString("en-IN")}
            </h3>

            <p>Total Collection</p>

          </div>

        </div>


        <div className="payment-stat-card">

          <div className="payment-stat-icon">
            ✓
          </div>

          <div>

            <h3>
              {paidPayments}
            </h3>

            <p>Paid Payments</p>

          </div>

        </div>


        <div className="payment-stat-card">

          <div className="payment-stat-icon">
            !
          </div>

          <div>

            <h3>
              {pendingPayments}
            </h3>

            <p>Pending Payments</p>

          </div>

        </div>

      </div>


      {/* =========================
          ADD PAYMENT FORM
      ========================= */}

      {showForm && (

        <div className="payment-form-container">

          <div className="payment-form-header">

            <h2>Add New Payment</h2>

            <button
              className="payment-close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="payment-form-grid">

              {/* Member ID */}

              <div className="payment-form-group">

                <label>
                  Member ID
                </label>

                <input
                  type="text"
                  name="memberId"
                  placeholder="Enter member ID"
                  value={formData.memberId}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Member Name */}

              <div className="payment-form-group">

                <label>
                  Member Name
                </label>

                <input
                  type="text"
                  name="memberName"
                  placeholder="Enter member name"
                  value={formData.memberName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Amount */}

              <div className="payment-form-group">

                <label>
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Payment Date */}

              <div className="payment-form-group">

                <label>
                  Payment Date
                </label>

                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Payment Method */}

              <div className="payment-form-group">

                <label>
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Method
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Card">
                    Card
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                </select>

              </div>


              {/* Payment Status */}

              <div className="payment-form-group">

                <label>
                  Payment Status
                </label>

                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Status
                  </option>

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

            </div>


            {/* FORM BUTTONS */}

            <div className="payment-form-buttons">

              <button
                type="button"
                className="payment-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="payment-save-btn"
              >
                Save Payment
              </button>

            </div>

          </form>

        </div>

      )}


      {/* =========================
          PAYMENT TABLE
      ========================= */}

      <div className="payment-table-container">

        <div className="payment-table-title">

          <div>

            <h2>
              Payment History
            </h2>

            <p>
              Recent gym payments
            </p>

          </div>

          <span>
            {payments.length} Payments
          </span>

        </div>


        <div className="payment-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>Member</th>

                <th>Amount</th>

                <th>Date</th>

                <th>Method</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {payments.map((payment) => (

                <tr key={payment.id}>

                  {/* ID */}

                  <td>

                    <span className="payment-id">
                      #{payment.id}
                    </span>

                  </td>


                  {/* MEMBER */}

                  <td>

                    <div className="payment-member">

                      <div className="member-avatar">
                        {payment.memberName.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {payment.memberName}
                        </strong>

                        <small>
                          {payment.memberId}
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* AMOUNT */}

                  <td>

                    <strong className="payment-amount">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </strong>

                  </td>


                  {/* DATE */}

                  <td>
                    {payment.paymentDate}
                  </td>


                  {/* METHOD */}

                  <td>

                    <span className="payment-method">
                      {payment.paymentMethod}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={
                        payment.paymentStatus === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }
                    >

                      {payment.paymentStatus}

                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <button
                      className="payment-delete-btn"
                      onClick={() =>
                        handleDelete(payment.id)
                      }
                    >
                      🗑
                    </button>

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

export default Payment;