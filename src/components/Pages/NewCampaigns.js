import { useState } from "react";
import Navbar from "../Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./../Styles/NewCampaigns.css";
import Instance from "../../utils/ContractInstance";
import ShowError from "./ShowError";
import { useNavigate } from "react-router-dom";
const Web3 = require("web3");

function NewCampaigns() {
  const [minContribution, setMinContribution] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      await Instance.methods
        .createCampaign(minContribution)
        .send({ from: accounts[0] });
      setErrorMsg("");
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="contribution">
        <div className="contributionWrapper">
          <h3>Minimum Contribution</h3>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>In Wei</Form.Label>
              <Form.Control
                defaultValue={minContribution}
                onChange={(event) => {
                  setMinContribution(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              className="button2"
              type="submit"
              onClick={() => {
                setLoading(true);
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
          {errorMsg && <ShowError message={errorMsg} />}
        </div>
      </div>
    </div>
  );
}

export default NewCampaigns;
