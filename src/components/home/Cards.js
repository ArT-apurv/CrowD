import { Card, Button, Row, Col } from "react-bootstrap";
import Instance from "../../utils/ContractInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [Address, setAddress] = useState([]);
  const navigate = useNavigate();

  async function getAddress() {
    const z = await Instance.methods.getDeployedCampaigns().call();

    setAddress(() => [...z]);
  }

  useEffect(() => {
    getAddress();
  }, []);

  return [
    <div>
      <Row xs={1} md={4} className="g-4 ms-auto container-fluid">
        {Address.map((element, index) => (
          <Col>
            <div>
              <Card
                className="container-fluid ms-auto mt-3 mb-1"
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <Card.Title>Contract {index + 1}</Card.Title>
                  <Card.Text>Address {element}</Card.Text>
                  <Button variant="primary">See Details</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <div>
        <Button
          variant="outline-primary"
          className="mt-5 ms-5"
          onClick={() => navigate("create")}
        >
          Create Campaigns
        </Button>
      </div>
    </div>,
  ];
}

export default Cards;
