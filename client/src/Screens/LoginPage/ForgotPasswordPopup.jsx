import React, { useState } from "react";
import "../LoginPage/LoginPage.css";

const ForgotPasswordPopup = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to send the OTP to the provided email
    // For simplicity, we'll move to the next step directly
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to verify the entered OTP
    // For simplicity, we'll directly show the thank you message
    setStep(3);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="PopupHeading">Enter Your Email Address</h3>
            <form onSubmit={handleEmailSubmit}>
              <div>
                <input
                  className="forgotInputContainer"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  required
                />
              </div>
              <button className="forgotSubmitBtn" type="submit">
                Submit
              </button>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="PopupHeading">
              We've sent a verification code to your email - abc@gmail.com
            </h3>
            <form onSubmit={handleOtpSubmit}>
              <input
                className="forgotInputContainer"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
              <div className="PopupMainContent ResendOtp">
                <h3>Didn't receive otp? Resend in - 50sec</h3>
                <span>Resend OTP</span>
              </div>
              <button className="forgotSubmitBtn" type="submit">
                Submit
              </button>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="PopupHeading">Thank You!</h3>
            <p className="PopupDesc">Your password reset is complete.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="forgotPasswordContainer">
      <div className="popupContainer">
        <div className="popup-content">
          <div className="PopupMainContent">
            <h1>Password Verification</h1>
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;