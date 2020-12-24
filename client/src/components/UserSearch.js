import React, { useState } from "react";
import axios from "axios";
import { TextInput, Button } from "./Utils";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ query: query });

      const res = await axios.post("/api/search", body, config);

      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextInput
        type="text"
        name="query"
        onChange={(e) => handleChange(e)}
        value={query.name}
      />
      <Button>Search</Button>
      {results.map((user) => (
        <p>{user.fullName}</p>
      ))}
    </form>
  );
};

export default UserSearch;
