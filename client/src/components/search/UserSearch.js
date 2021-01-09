import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextInput, Button } from "../utils/Utils";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    history.push(`/search?user=${query}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextInput
        placeholder="Find your friends..."
        type="text"
        name="query"
        onChange={(e) => handleChange(e)}
        value={query.name}
      />
      <Button>Search</Button>
    </form>
  );
};

export default UserSearch;
