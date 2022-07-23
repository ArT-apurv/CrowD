import React from "react";
import { Route, Routes } from "react-router-dom";
import ConnectedWallet from "./components/ConnectedWallet";
import Campaigns from "./components/Campaigns";
import NewCampaigns from "./components/Pages/NewCampaigns";
import { AboutCampaigns } from "./components/Pages/AboutCampaigns";
import Requests from "./components/Pages/Requests";
import NewRequests from "./components/Pages/NewRequests";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ConnectedWallet />}></Route>
        <Route path="/campaigns" element={<Campaigns />}></Route>
        <Route path="/campaigns/:address" element={<AboutCampaigns />} />
        <Route path="/campaigns/:address/requests" element={<Requests />} />
        <Route
          path="/campaigns/:address/requests/new"
          element={<NewRequests />}
        />
        <Route path="/campaigns/new" element={<NewCampaigns />} />
      </Routes>
    </>
  );
};

export default App;
