import { Card, Button, Row, Col } from "react-bootstrap";
import Instance from "../../utils/ContractInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Card.css";
import Navbar from "../Navbar";

function Cards() {
  const [Address, setAddress] = useState([]);
  async function getAddress() {
    const z = await Instance.methods.getDeployedCampaigns().call();

    setAddress(() => [...z]);
  }

  const navigate = useNavigate();

  useEffect(() => {
    getAddress();
  }, []);

  return [
    <div>
      <Navbar />
      <div id="bootstrap-overrides">
        <div className="cardWrapper">
          <h3>Open Campaigns</h3>
          <Row xs={1} md={4} className="g-4 container-fluid">
            {Address.map((element, index) => (
              <Col>
                <div>
                  <Card
                    className="container-fluid mt-3 mb-1 cardStyle"
                    style={{ width: "18rem" }}
                    key={index + 1}
                  >
                    <Card.Body>
                      <Card.Title>Contract {index + 1}</Card.Title>
                      <Card.Text>Address {element}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/campaigns/${element}`);
                        }}
                      >
                        See Details
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        ,
      </div>
    </div>,
  ];
}

export default Cards;
