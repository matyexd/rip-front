import { Route, Routes, useNavigate } from "react-router-dom";
import Todo from "../pages/Todo";
import Chat from "../pages/Chat/Chat";
import React, { useEffect } from "react";
import { useAuth } from "../context/provideAuth";

const PrivateRoutes = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) navigate("/login");
  }, [auth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
