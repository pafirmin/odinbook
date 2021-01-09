import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import UserResult from "./UserResult";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = `Search results - ${query.get("user")}`;
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/search?user=${query.get("user")}`);

        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div>
      {results.map((user) => (
        <UserResult user={user} />
      ))}
    </div>
  );
};

export default SearchResults;
