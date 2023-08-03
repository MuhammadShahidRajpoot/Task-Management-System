import React, { useEffect, useState } from "react";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { getUserApi } from "./api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const isLoggedIn = localStorage.getItem("userId");
      if (isLoggedIn) {
        const { data } = await getUserApi();
        if (data) {
          const user = data.filter((el) => el.id === parseInt(isLoggedIn));
          if (user.length > 0) {
            dispatch(setUser(user[0]));
          }
        }
      }
    })();
  }, []);
  return (
    <Routes>
      {/* Show Login component by default */}
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
