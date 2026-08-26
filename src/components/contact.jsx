import React, { useState } from "react";
import "./contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Patil",
      email: "rahul@gmail.com",
      phone: "9876543210",
      subject: "Membership Inquiry",
      message: "I want to know about premium membership.",
      status: "New"
    },
    {
      id: 2,
      name: "Amit Shinde",
      email: "amit@gmail.com",
      phone: "9876501234",
      subject: "Trainer",
      message: "I want to contact a personal trainer.",
      status: "Replied"
    }
  ]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const newMessage = {
      id: messages.length + 1,
      ...formData,
      status: "New"
    };

    setMessages([
      ...messages,
      newMessage
    ]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    alert("Message sent successfully!");

  };


  const handleDelete = (id) => {

    setMessages(
      messages.filter(
        (message) => message.id !== id
      )
    );

  };


  return (

    <div className="contact-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="contact-header">

        <div>

          <h1>Contact</h1>

          <p>
            Manage customer messages and enquiries
          </p>

        </div>

      </div>


      {/* =========================
          CONTACT INFORMATION
      ========================= */}

      <div className="contact-info-grid">

        <div className="contact-info-card">

          <div className="contact-info-icon">
            📍
          </div>

          <div>

            <h3>
              Address
            </h3>

            <p>
              Kolhapur, Maharashtra
            </p>

          </div>

        </div>


        <div className="contact-info-card">

          <div className="contact-info-icon">
            📞
          </div>

          <div>

            <h3>
              Phone
            </h3>

            <p>
              +91 98765 43210
            </p>

          </div>

        </div>


        <div className="contact-info-card">

          <div className="contact-info-icon">
            ✉
          </div>

          <div>

            <h3>
              Email
            </h3>

            <p>
              fitzone@gmail.com
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          CONTACT FORM
      ========================= */}

      <div className="contact-form-container">

        <div className="contact-form-title">

          <h2>
            Send Message
          </h2>

          <p>
            Send a message to a gym member or customer
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="contact-form-grid">

            {/* Name */}

            <div className="contact-form-group">

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}

            <div className="contact-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* Phone */}

            <div className="contact-form-group">

              <label>
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>


            {/* Subject */}

            <div className="contact-form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Message */}

          <div className="contact-form-group message-group">

            <label>
              Message
            </label>

            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

          </div>


          <div className="contact-submit-area">

            <button
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
            </button>

          </div>

        </form>

      </div>


      {/* =========================
          MESSAGES
      ========================= */}

      <div className="messages-container">

        <div className="messages-header">

          <div>

            <h2>
              Customer Messages
            </h2>

            <p>
              Recent enquiries and messages
            </p>

          </div>

          <span>
            {messages.length} Messages
          </span>

        </div>


        <div className="messages-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Contact
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Message
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {messages.map((item) => (

                <tr key={item.id}>

                  {/* ID */}

                  <td>

                    <span className="message-id">
                      #{item.id}
                    </span>

                  </td>


                  {/* CUSTOMER */}

                  <td>

                    <div className="customer-info">

                      <div className="customer-avatar">
                        {item.name.charAt(0)}
                      </div>

                      <strong>
                        {item.name}
                      </strong>

                    </div>

                  </td>


                  {/* CONTACT */}

                  <td>

                    <div className="contact-details">

                      <span>
                        {item.email}
                      </span>

                      <span>
                        {item.phone}
                      </span>

                    </div>

                  </td>


                  {/* SUBJECT */}

                  <td>
                    {item.subject}
                  </td>


                  {/* MESSAGE */}

                  <td>

                    <span className="message-text">
                      {item.message}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={
                        item.status === "New"
                          ? "message-new"
                          : "message-replied"
                      }
                    >
                      {item.status}
                    </span>

                  </td>


                  {/* DELETE */}

                  <td>

                    <button
                      className="message-delete-btn"
                      onClick={() =>
                        handleDelete(item.id)
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

export default Contact;