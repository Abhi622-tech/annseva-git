import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./styles/contact.css";

const Contact = () => {
  const send = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/contact",
        {
          name: document.querySelector("#name").value,
          subject: document.querySelector("#subject").value,
          message: document.querySelector("#message").value,
          email: document.querySelector("#email").value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 201) {
        toast.success("Message successfully sent");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <div className="contact">
      <h2>Get in Touch</h2>
      <div className="contact-container">
        <div className="contact-form">
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message here"
            rows="6"
          ></textarea>
          <div className="contact-inputs">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Enter Subject"
          />
          <button onClick={send}>Send Message</button>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <i className="icon home-icon"></i>
            <p>
              <strong>AnnSeva</strong> organization,
              <br />
              Ibrahimpatnam, Hyderabad, 501510
            </p>
          </div>
          <div className="contact-item">
            <i className="icon phone-icon"></i>
            <p>
              9867543210
              <br />
              Mon to Fri 9am to 6pm
            </p>
          </div>
          <div className="contact-item">
            <i className="icon email-icon"></i>
            <p>
              <strong>annsevaorg@gmail.com</strong>
              <br />
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Contact;
