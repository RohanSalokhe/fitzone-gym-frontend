import React, { useEffect, useState } from "react";
import "./payment.css";

const API_URL = "https://fitzone-gym-backend.onrender.com";

function Payment() {
    const [payments, setPayments] = useState([]);
    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        memberId: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "Cash",
        paymentStatus: "Paid"
    });

    const [loading, setLoading] = useState(false);

    // ================= GET PAYMENTS =================

    const fetchPayments = async () => {
        try {
            const response = await fetch(`${API_URL}/payments`, {
                headers: {
                    Authorization: "admin"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch payments");
            }

            setPayments(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Fetch Payments Error:", error);
            alert("Unable to load payments");
        }
    };

    // ================= GET MEMBERS =================

    const fetchMembers = async () => {
        try {
            const response = await fetch(`${API_URL}/members`, {
                headers: {
                    Authorization: "admin"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch members");
            }

            setMembers(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Fetch Members Error:", error);
        }
    };

    // ================= USE EFFECT =================

    useEffect(() => {
        fetchPayments();
        fetchMembers();
    }, []);

    // ================= INPUT CHANGE =================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ================= ADD PAYMENT =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.memberId) {
            alert("Please select member");
            return;
        }

        if (!formData.amount) {
            alert("Please enter amount");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/payments`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: "admin"
                },

                body: JSON.stringify({
                    memberId: formData.memberId,
                    amount: formData.amount,
                    paymentDate: formData.paymentDate || null,
                    paymentMethod: formData.paymentMethod,
                    paymentStatus: formData.paymentStatus
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Payment failed"
                );
            }

            alert("Payment added successfully");

            setFormData({
                memberId: "",
                amount: "",
                paymentDate: "",
                paymentMethod: "Cash",
                paymentStatus: "Paid"
            });

            await fetchPayments();

        } catch (error) {
            console.error("Add Payment Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE PAYMENT =================

    const handleDelete = async (payment) => {

        const paymentId = payment?.paymentId;

        if (
            paymentId === undefined ||
            paymentId === null ||
            paymentId === ""
        ) {
            alert("Payment ID is missing.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete payment #${paymentId}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/payments/${encodeURIComponent(paymentId)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "admin"
                    }
                }
            );

            const text = await response.text();

            let data = {};

            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                throw new Error(
                    "Server returned an invalid response."
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to delete payment"
                );
            }

            alert("Payment deleted successfully");

            setPayments((prevPayments) =>
                prevPayments.filter(
                    (p) =>
                        Number(p.paymentId) !==
                        Number(paymentId)
                )
            );

            await fetchPayments();

        } catch (error) {

            console.error(
                "Delete Payment Error:",
                error
            );

            alert(
                error.message ||
                "Unable to delete payment"
            );
        }
    };

    // ================= FORMAT DATE =================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const d = new Date(date);

        if (isNaN(d.getTime())) {
            return date;
        }

        return d.toLocaleDateString("en-IN");
    };

    // ================= MEMBER NAME =================

    const getMemberName = (payment) => {

        if (payment.memberName) {
            return payment.memberName;
        }

        const member = members.find(
            (m) =>
                String(m.memberId) ===
                String(payment.memberId)
        );

        return member
            ? member.memberName
            : "Unknown Member";
    };

    // ================= UNIQUE KEY =================

    const getPaymentKey = (payment, index) => {

        if (
            payment.paymentId !== undefined &&
            payment.paymentId !== null
        ) {
            return `payment-${payment.paymentId}`;
        }

        return `payment-fallback-${index}`;
    };

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="payment-page">

            {/* ================= HEADER ================= */}

            <div className="payment-page-header">

                <div>
                    <div className="page-heading">
                        <span className="heading-line"></span>

                        <h1>
                            Payment <span>Management</span>
                        </h1>
                    </div>

                    <p className="page-subtitle">
                        Manage membership payments and transactions
                    </p>
                </div>

                <div className="payment-header-box">
                    <div className="header-rupee">
                        ₹
                    </div>

                    <div>
                        <small>Total Records</small>
                        <strong>{payments.length}</strong>
                    </div>
                </div>

            </div>


            {/* ================= ADD PAYMENT CARD ================= */}

            <div className="payment-section-card">

                <div className="section-card-header">

                    <div className="section-icon">
                        +
                    </div>

                    <div>
                        <h2>Add Payment</h2>
                        <p>
                            Enter the payment details below
                        </p>
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="payment-form-grid">

                        {/* MEMBER */}

                        <div className="payment-field">

                            <label>
                                Member <span>*</span>
                            </label>

                            <select
                                name="memberId"
                                value={formData.memberId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Member
                                </option>

                                {members.map((member) => (
                                    <option
                                        key={`member-${member.memberId}`}
                                        value={member.memberId}
                                    >
                                        {member.memberName}
                                    </option>
                                ))}

                            </select>

                        </div>


                        {/* AMOUNT */}

                        <div className="payment-field">

                            <label>
                                Amount <span>*</span>
                            </label>

                            <div className="amount-wrapper">

                                <span className="currency-symbol">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>

                        </div>


                        {/* DATE */}

                        <div className="payment-field">

                            <label>
                                Payment Date
                            </label>

                            <input
                                type="date"
                                name="paymentDate"
                                value={formData.paymentDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* METHOD */}

                        <div className="payment-field">

                            <label>
                                Payment Method
                            </label>

                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            >

                                <option value="Cash">
                                    Cash
                                </option>

                                <option value="UPI">
                                    UPI
                                </option>

                                <option value="Card">
                                    Card
                                </option>

                                <option value="Online">
                                    Online
                                </option>

                            </select>

                        </div>


                        {/* STATUS */}

                        <div className="payment-field">

                            <label>
                                Payment Status
                            </label>

                            <select
                                name="paymentStatus"
                                value={formData.paymentStatus}
                                onChange={handleChange}
                            >

                                <option value="Paid">
                                    Paid
                                </option>

                                <option value="Confirmed">
                                    Confirmed
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                                <option value="Failed">
                                    Failed
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* BUTTON */}

                    <div className="payment-button-area">

                        <button
                            type="submit"
                            className="add-payment-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="button-loader"></span>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <span>+</span>
                                    Add Payment
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>


            {/* ================= RECORDS ================= */}

            <div className="payment-section-card records-card">

                <div className="records-top">

                    <div className="section-card-header">

                        <div className="section-icon">
                            ₹
                        </div>

                        <div>
                            <h2>Payment Records</h2>

                            <p>
                                View and manage all payment transactions
                            </p>
                        </div>

                    </div>

                    <div className="records-count">
                        {payments.length} Records
                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="payment-table-container">

                    <table className="payment-table">

                        <thead>

                            <tr>
                                <th>Payment ID</th>
                                <th>Member ID</th>
                                <th>Member Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>


                        <tbody>

                            {payments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="empty-payment-cell"
                                    >

                                        <div className="empty-payment">

                                            <div className="empty-payment-icon">
                                                ₹
                                            </div>

                                            <h3>
                                                No Payments Found
                                            </h3>

                                            <p>
                                                Payment records will appear here.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                payments.map((payment, index) => (

                                    <tr
                                        key={getPaymentKey(
                                            payment,
                                            index
                                        )}
                                    >

                                        {/* PAYMENT ID */}

                                        <td>

                                            <span className="payment-id">
                                                #{payment.paymentId}
                                            </span>

                                        </td>


                                        {/* MEMBER ID */}

                                        <td>
                                            <span className="member-id">
                                                {payment.memberId}
                                            </span>
                                        </td>


                                        {/* MEMBER NAME */}

                                        <td>

                                            <div className="member-cell">

                                                <div className="member-avatar">
                                                    {getMemberName(payment)
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <span>
                                                    {getMemberName(payment)}
                                                </span>

                                            </div>

                                        </td>


                                        {/* AMOUNT */}

                                        <td>

                                            <span className="payment-amount">
                                                ₹{payment.amount}
                                            </span>

                                        </td>


                                        {/* DATE */}

                                        <td>
                                            {formatDate(
                                                payment.paymentDate
                                            )}
                                        </td>


                                        {/* METHOD */}

                                        <td>

                                            <span className="method-badge">
                                                {payment.paymentMethod || "-"}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`status-badge status-${(
                                                    payment.paymentStatus ||
                                                    ""
                                                )
                                                    .toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    )}`}
                                            >
                                                {payment.paymentStatus || "-"}
                                            </span>

                                        </td>


                                        {/* DELETE */}

                                        <td>

                                            <button
                                                type="button"
                                                className="delete-payment-btn"
                                                onClick={() =>
                                                    handleDelete(payment)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Payment;