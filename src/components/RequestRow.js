import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CampaignInstance from "../utils/CampaignsInstance";
const Web3 = require("web3");

function RequestRow(props) {
  const [count, setCount] = useState();
  const web3 = new Web3(window.ethereum);
  const campaign = CampaignInstance(props.address);
  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });
  };

  useEffect(() => {
    const approversCount = async () => {
      const approvers = await campaign.methods.approversCount().call();
      return approvers;
    };

    approversCount().then((e) => {
      setCount(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (count !== undefined) {
    return (
      <tr className={props.request[3] && "text-muted"}>
        <td>{props.id + 1}</td>
        <td>{props.request[0]}</td>
        <td>{web3.utils.fromWei(props.request[1], "ether")}</td>
        <td>{props.request[2]}</td>
        <td>{`${props.request[4]}/${count}`}</td>
        <td>
          {props.request[3] ? (
            <Button variant="success">Approved</Button>
          ) : (
            <Button variant="outline-success" onClick={onApprove}>
              Approve
            </Button>
          )}
        </td>
        <td>
          {props.request[3] ? (
            <Button variant="dark">Finalized</Button>
          ) : (
            <Button variant="outline-dark" onClick={onFinalize}>
              Finalize
            </Button>
          )}
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{props.id + 1}</td>
        <td>{props.request[0]}</td>
        <td>{web3.utils.fromWei(props.request[1], "ether")}</td>
        <td>{props.request[2]}</td>
        <td>{props.request[4]}</td>
        <td>
          <Button variant="outline-success" onClick={onApprove}>
            Approve
          </Button>
        </td>
      </tr>
    );
  }
}

export default RequestRow;
