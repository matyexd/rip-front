import { useAuth } from "../context/provideAuth";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Login from "../pages/Login/Login";

const PublicRoutes = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) navigate("/");
  }, [auth.user]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;
