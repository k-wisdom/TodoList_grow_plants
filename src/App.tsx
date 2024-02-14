import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./store";
import { Home, SignIn, SignUp, NotFound, SelectPlant } from "./pages";
import NotAuthLayout from "./components/layout/NotAuthLayout";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/selectPlant" element={<SelectPlant />} />
          </Route>
          <Route element={<NotAuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
