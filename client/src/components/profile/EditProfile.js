import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import { LoadingContext } from "../../contexts/LoadingContext";

const EditProfile = () => {
  const { state } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  const [profileData, setProfileData] = useState({
    location: "",
    occupation: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${state.token}`,
        },
      };

      const body = JSON.stringify(profileData);

      axios.put(`/api/users/profile`, body, config);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
        <header className="form-header">
          <h2>Edit your profile</h2>
        </header>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <TextInput
            id="location"
            name="location"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <TextInput
            id="occupation"
            name="occupation"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="bio">A little about yourself:</label>
          <TextInput id="bio" name="bio" onChange={(e) => handleChange(e)} />
        </div>
        <Button>Update profile</Button>
      </form>
    </div>
  );
};

export default EditProfile;
