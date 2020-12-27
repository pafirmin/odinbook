import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const [results, setResults] = useState([]);

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
  }, []);

  return (
    <div>
      {results.map((user) => (
        <p key={user._id}>
          <Link to={`/user/${user._id}`}>{user.fullName}</Link>
        </p>
      ))}
    </div>
  );
};

export default SearchResults;
