import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import CampaignInstance from "../../utils/CampaignsInstance";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./../Styles/AboutCampaign.css";
import ContributeForm from "../ContributeForm";
const Web3 = require("web3");

export const AboutCampaigns = () => {
  const [summary, setSummary] = useState({});
  const [refAcquired, setRefAcquired] = useState(false);
  const params = useParams();
  const address = params.address;
  const navigate = useNavigate();

  useEffect(() => {
    const summaryFunction = async () => {
      const campaign = CampaignInstance(address);
      const summary = await campaign.methods.getSummary().call();
      return summary;
    };
    summaryFunction()
      .then((result) => {
        setSummary({ result });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [address]);

  useEffect(() => {
    setRefAcquired(true);
  }, []);

  const web3 = new Web3(window.ethereum);

  if (summary.result !== undefined) {
    console.log(summary);
    return (
      <div>
        <Navbar />
        <Button
          variant="primary"
          className="button"
          onClick={() => {
            navigate(`/campaigns/${address}/requests`);
          }}
        >
          View Requests
        </Button>
        <ContributeForm address={address} />
        <div id="bootstrap-overrides">
          <div className="cardWrapper">
            <Row xs={1} md={4} className="g-4 container-fluid">
              <Col>
                <Card
                  className="container-fluid mt-3 mb-1 cardStyle"
                  style={{ width: "18rem" }}
                >
                  <Card.Header as="h6" id="card-header-color">
                    {summary.result[4]}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h6">Address of Manager</Card.Title>
                    <Card.Text>
                      The manager created this campaign and can create requests
                      to withdraw money
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="container-fluid mt-3 mb-1 cardStyle"
                  style={{ width: "18rem" }}
                >
                  <Card.Header as="h5" id="card-header-color">
                    {summary.result[0]}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h6">Minimum Contribution(wei)</Card.Title>
                    <Card.Text>
                      You must contribute at least this much wei to become an
                      approver
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="container-fluid mt-3 mb-1 cardStyle"
                  style={{ width: "18rem" }}
                >
                  <Card.Header as="h5" id="card-header-color">
                    {web3.utils.fromWei(summary.result[1], "ether")}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h6">Campaign Balance(ether)</Card.Title>
                    <Card.Text>
                      The balance is how much money this campaign had left to
                      spend
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="container-fluid mt-3 mb-1 cardStyle"
                  style={{ width: "18rem" }}
                >
                  <Card.Header as="h5" id="card-header-color">
                    {summary.result[2]}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h6">Total number of requests</Card.Title>
                    <Card.Text>
                      A request tries to withdraw money from the contract.
                      Requests must be approved.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="container-fluid mt-3 mb-1 cardStyle"
                  style={{ width: "18rem" }}
                >
                  <Card.Header as="h5" id="card-header-color">
                    {summary.result[3]}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h6">Number of Approvers</Card.Title>
                    <Card.Text>
                      Number of people who have already donated to this
                      campaign.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
};
