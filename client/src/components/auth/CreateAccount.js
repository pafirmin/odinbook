import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import { AlertContext } from "../../contexts/AlertContext";

const SubmitBtn = styled(Button)`
  font-size: 1.2rem;

  &:hover {
    background-color: #2785c4;
  }
`;

const CreateAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const { setAlerts } = useContext(AlertContext);
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    familyName: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    document.title = "Odinbook - Create Account";
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(userData);

      const res = await axios.post("/api/users", body);

      const { token, userID, userName } = res.data;

      dispatch({
        type: "login",
        payload: {
          token,
          userID,
          userName,
        },
      });

      setAlerts([{ text: "Sign-up successful!", type: "success" }]);
      setRedirectOnSuccess(true);
    } catch (err) {
      console.error(err);
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "warning" };
      });
      setAlerts(errorArray);
    } finally {
      setTimeout(() => setAlerts([]), 5000);
    }
  };

  return (
    <Fragment>
      {redirectOnSuccess && <Redirect to="/" />}
      <div style={{ marginTop: "10vh" }}>
        <form onSubmit={(e) => handleSubmit(e)} className="user-form">
          <header className="form-header">
            <h2>Create an account</h2>
            <span>
              Already have an account? <Link to="/login">Sign in here</Link>
            </span>
          </header>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <TextInput
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="user-name">
            <div className="form-group name">
              <label htmlFor="firstName">First name:</label>
              <TextInput
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group name">
              <label htmlFor="familyName">Last name:</label>
              <TextInput
                type="text"
                id="familyName"
                name="familyName"
                value={userData.familyName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <TextInput
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm password:</label>
            <TextInput
              type="password"
              id="password2"
              name="password2"
              value={userData.password2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <SubmitBtn>Create Account</SubmitBtn>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateAccount;
