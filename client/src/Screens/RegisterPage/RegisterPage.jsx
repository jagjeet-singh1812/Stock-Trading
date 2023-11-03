import React, { useState } from "react";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
// import ForgotPasswordPopup from "./ForgotPasswordPopup";
import { FaEye } from "react-icons/fa";
// import url from "blah";
// import axios from "axios";
const options = ["University", "SPOC", "Faculty", "Student", "Guest-User"];
const defaultOption = options[0];
const SERVER = "http://localhost:5000";

const eye = <FaEye />;

const RegisterPage = () => {
  const url = "bleh";
  // const Navigate = useNavigate();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setNamename] = useState("");
  const [selectedOption, setSelectedOption] = useState("University");

  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowForgotPasswordPopup(false);
  };
  const handleFocus = (e) => {
    e.target.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    const parent = e.target.parentNode;
    if (e.target.value === "") {
      parent.classList.remove("focus");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = async () => {
      let endpoint = "/api/v1/user/register";
      try {
        console.log(selectedOption);
        // console.log(selectedOption);
        // console.log(selectedOption)
        console.log(endpoint);
        console.log("Sending request to:", `${endpoint}`);
        console.log("Sending data:", { email: username, password: password });
        const result = await fetch(SERVER + endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: username,
            password,
          }),
        }).then((data) => data.json());
        console.log(result);

        // const response = await axios.post(`${url}${endpoint}`, {
        //   email: username,
        //   password: password,
        // });
        // /api/v1/university/login
        // /api/v1/college/college_faculty/login
        // /api/v1/college/student/login
        // console.log(response);

        // localStorage.setItem("token", response.data.token);

        // Navigate("/crypto");
        if (result.token) {
          localStorage.setItem("token", result.token);
          history.push("/login");
        } else if (result == "User not Found") {
          alert("Incorrect Credentials"); 
        }
        // alert("yooo")
      } catch (error) {
        alert("Invalid Credentials");
      }
    };

    sendData();
  };

  console.log(selectedOption);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <div className="LoginPageCont">
        <section className="Logincontainer">
          <div className="image-section">
            <div className="image-wrapper">
              <img src="https://imgur.com/wDmDIhi.png" alt="" />
            </div>

            <div className="content-container">
              <h1 className="section-heading">
                Trade. Connect. <span>Prosper.</span>
              </h1>
              <p className="section-paragraph">
                Your gateway to simplified investing and collaborative
                wealth-building in the Indian market. Join us and embark on your
                financial journey today
              </p>
            </div>
          </div>

          <form className="form-section" onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <h2>WELCOME BACK! 👋🏻</h2>
              <p>Enter your credentials to access your account.</p>

              <div className="input-container">
                {/* <div className="dropDownDiv">
                  <Dropdown
                    options={options}
                    value={defaultOption}
                    placeholder="Select an option"
                    onChange={(e) => setSelectedOption(e.value)}
                  />
                </div> */}
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="name"
                    id="name"
                    autocomplete="off"
                    placeholder="Enter your name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={name}
                    onChange={(e) => setNamename(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    autocomplete="off"
                    placeholder="Enter your email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                </div>
              </div>

              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" value="remember-me" id="remember-me" />
                  <label for="remember-me">Remember me</label>
                </div>

                <a href="#" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </a>
              </div>

              {/* <button className="login-btn">Log In</button> */}
              <div className="inputSubmitDiv">
                <input type="submit" className="login-btn" value="REGISTER" />
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* {showForgotPasswordPopup && (
        <ForgotPasswordPopup onClose={handleClosePopup} />
      )} */}
    </>
  );
};

export default RegisterPage;
