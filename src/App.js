import React from "react";
import { Route, Routes } from "react-router-dom";
import ConnectedWallet from "./components/ConnectedWallet";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ConnectedWallet />}></Route>
      </Routes>
    </>
  );
};

export default App;
