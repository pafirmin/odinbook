import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextInput } from "../utils/Utils";
import { LoadingContext } from "../../contexts/LoadingContext";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext).state;
  const { setLoading } = useContext(LoadingContext);
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState({
    location: "",
    occupation: "",
    bio: "",
  });

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        };
        const res = await axios.get(`/api/users/`, config);
        const user = res.data;
        const profile = user.profile;
        setUser(user);
        setProfileData(profile);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

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

      const body = JSON.stringify(profileData);

      axios.put(`/api/users/profile`, body, config);

      history.push(`/user/${user._id}`);
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
          <label for="bio">A little about yourself:</label>
          <TextInput
            id="bio"
            name="bio"
            onChange={(e) => handleChange(e)}
            value={profileData.bio}
          />
        </div>
        <Button>Update profile</Button>
      </form>
    </div>
  );
};

export default EditProfile;
