import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CampaignInstance from "../utils/CampaignsInstance";
import ShowError from "./Pages/ShowError";
const Web3 = require("web3");

function ContributeForm(props) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const address = props.address;
    const campaign = CampaignInstance(address);
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") });
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
      <div className="contribution">
        <div className="contributionWrapper">
          <h3>Contribution</h3>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>In Ethers</Form.Label>
              <Form.Control
                defaultValue={value}
                onChange={(event) => {
                  setValue(event.target.value);
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
              {loading ? "Loading..." : "Contribute"}
            </Button>
          </Form>
          {showError && <ShowError message={showError} />}
        </div>
      </div>
    </div>
  );
}

export default ContributeForm;
