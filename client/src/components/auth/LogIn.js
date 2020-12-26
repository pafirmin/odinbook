import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button } from "../Utils";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";

const LogIn = () => {
  const { setAlerts } = useContext(AlertContext);
  const { dispatch } = useContext(AuthContext);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(userDetails);

      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: "login",
        payload: {
          token: res.data.token,
          userID: res.data.userID,
        },
      });

      setSuccessfulLogin(true);
      setAlerts([{ text: "Login successful!", type: "success" }]);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    }
    setTimeout(() => setAlerts([]), 5000);
  };

  return (
    <div>
      {successfulLogin && <Redirect to="/" />}
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <header className="form-header">
          <h2>Log in</h2>
          <span>
            Don't have an account?{" "}
            <Link to="/createaccount">Create one here</Link>
          </span>
        </header>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <TextInput
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <TextInput
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <Button>Log in</Button>
      </form>
    </div>
  );
};

export default LogIn;
