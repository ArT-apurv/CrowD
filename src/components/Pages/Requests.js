import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import CampaignInstance from "../../utils/CampaignsInstance";
import RequestRow from "../RequestRow";
import "./../Styles/NewCampaigns.css";

function Requests() {
  const params = useParams();
  const address = params.address;
  const navigate = useNavigate();
  const campaign = CampaignInstance(address);
  const [numOfRequest, setNumOfRequest] = useState();
  const [arrays, setArrays] = useState([]);

  useEffect(() => {
    const getRequestCount = async () => {
      const requestCount = await campaign.methods.getRequestsCount().call();
      return requestCount;
    };
    getRequestCount()
      .then((e) => setNumOfRequest(e))
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const requests = async () => {
      const array = new Array(parseInt(numOfRequest));
      for (let i = 0; i < numOfRequest; i++) {
        const request = await campaign.methods.requests(i).call();
        array[i] = request;
      }
      return array;
    };
    requests().then((e) => setArrays(() => [...e]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfRequest]);

  if (arrays[0] !== undefined && arrays.length !== 0) {
    return (
      <div>
        <Navbar />
        <Button
          variant="primary"
          className="button3"
          onClick={() => {
            navigate(`/campaigns/${address}/requests/new`);
          }}
        >
          Add Requests
        </Button>
        <div className="contribution">
          <div className="contributionWrapper">
            <h3>Requests</h3>
            <Table
              hover
              className="text-center"
              style={{ marginTop: "20px", backgroundColor: "#e8e8e8" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Recipient Address</th>
                  <th>Approval Count</th>
                  <th>Approve</th>
                  <th>Finalize</th>
                </tr>
              </thead>
              {arrays.map((element, index) => {
                return (
                  <tbody>
                    {
                      <RequestRow
                        key={index}
                        id={index}
                        request={element}
                        address={address}
                      />
                    }
                  </tbody>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Button
          variant="primary"
          className="button3"
          onClick={() => {
            navigate(`/campaigns/${address}/requests/new`);
          }}
        >
          Add Requests
        </Button>
        <div className="contribution">
          <div className="contributionWrapper">
            <h3>Requests</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Requests;
