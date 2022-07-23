import { useState } from "react";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import CampaignInstance from "../../utils/CampaignsInstance";
import ShowError from "./ShowError";
import "./../Styles/NewCampaigns.css";
const Web3 = require("web3");

function NewRequests() {
  const params = useParams();
  const address = params.address;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const campaign = CampaignInstance(address);

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      setLoading(false);
      setShowError("");
      window.location.reload();
    } catch (error) {
      setShowError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <Button
        variant="primary"
        className="button3"
        onClick={() => {
          navigate(`/campaigns/${address}/requests`);
        }}
      >
        Back
      </Button>
      <div className="contribution">
        <div className="contributionWrapper">
          <h3>Create a Request</h3>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                defaultValue={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Value in Ethers</Form.Label>
              <Form.Control
                defaultValue={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipient</Form.Label>
              <Form.Control
                defaultValue={recipient}
                onChange={(event) => {
                  setRecipient(event.target.value);
                }}
              />
            </Form.Group>
            <Button className="button2" type="submit">
              {loading ? "Loading..." : "Add Request"}
            </Button>
          </Form>
          {showError && <ShowError message={showError} />}
        </div>
      </div>
    </div>
  );
}

export default NewRequests;
