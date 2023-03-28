import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3>Sneaking around? It looks like you're not logged in!</h3>
      <button onClick={() => navigate("/")}>Log in here</button>
    </>
  );
};

export default Redirect;
