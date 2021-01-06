import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { TextInput, Button } from "../utils/Utils";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSearchSubmitted(true);
  };

  return (
    <Fragment>
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
      {searchSubmitted && <Redirect to={`/search?user=${query}`} />}
    </Fragment>
  );
};

export default UserSearch;
