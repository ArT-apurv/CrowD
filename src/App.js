import React from "react";
import { Route, Routes } from "react-router-dom";
import ConnectedWallet from "./components/ConnectedWallet";
import Campaigns from "./components/Campaigns";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ConnectedWallet />}></Route>
        <Route path="/campaigns" element={<Campaigns />}></Route>
      </Routes>
    </>
  );
};

export default App;
