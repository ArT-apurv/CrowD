import { Card, Button, Row, Col } from "react-bootstrap";
import Instance from "../../utils/ContractInstance";
import { useEffect, useState } from "react";
import AddButton from "../NewCampaigns/AddButton";
import "./../Styles/Card.css";

function Cards() {
  const [Address, setAddress] = useState([]);
  async function getAddress() {
    const z = await Instance.methods.getDeployedCampaigns().call();

    setAddress(() => [...z]);
  }

  useEffect(() => {
    getAddress();
  }, []);

  return [
    <div id="bootstrap-overrides">
      <div>
        <AddButton />
      </div>
      <Row xs={1} md={4} className="g-4 ms-auto container-fluid">
        {Address.map((element, index) => (
          <Col>
            <div>
              <Card
                className="container-fluid ms-auto mt-3 mb-1 cardStyle"
                style={{ width: "18rem" }}
                key={index + 1}
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
    </div>,
  ];
}

export default Cards;
