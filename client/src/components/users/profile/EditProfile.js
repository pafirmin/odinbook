import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button, TextInput } from "../../utils/Utils";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../contexts/AlertContext";

const EditProfile = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext).state;
  const { setAlerts } = useContext(AlertContext);
  const { setLoading } = useContext(LoadingContext);
  const [image, setImage] = useState("");
  const [profileData, setProfileData] = useState({
    location: "",
    occupation: "",
    bio: "",
  });

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        };
        const res = await axios.get(`/api/users/profile`, config);
        const profile = res.data;

        setProfileData(profile);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

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
          Authorization: `bearer ${token}`,
        },
      };
      const { location, occupation, bio } = profileData;
      const body = JSON.stringify({ location, occupation, bio, image });

      const res = await axios.put(`/api/users/profile`, body, config);
      const userID = res.data;

      history.push(`/user/${userID}`);
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "danger" };
      });
      setAlerts(errorArray);
    }
    setLoading(false);
    setTimeout(() => setAlerts([]), 5000);
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
            value={profileData.location}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <TextInput
            id="occupation"
            name="occupation"
            value={profileData.occupation}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">A little about yourself:</label>
          <TextInput
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Profile pic:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => handleFile(e)}
          />
        </div>
        {image && <img src={image} className="large thumbnail" />}
        <Button>Save changes</Button>
      </form>
    </div>
  );
};

export default EditProfile;
