import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Instance from "./../../utils/ContractInstance";

function AddButton() {
  const [inputValue, setInputValue] = useState();
  async function simulateNetworkRequest() {
    const x = Instance.methods
      .createCampaign(inputValue)
      .send({ from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" });

    return x;
  }
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      try {
        simulateNetworkRequest()
          .then(() => {
            setLoading(false);
            window.location.reload(false);
          })
          .catch((e) => {
            if (e.code === 4001) {
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <form>
      <input
        className="input-1"
        // value={recipientAddress}
        onChange={(event) => setInputValue(event.value)}
        placeholder="recipient address"
      ></input>
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
        className="mt-5 ms-5"
      >
        {isLoading ? "Loading…" : "Create Campaign"}
      </Button>
    </form>
  );
}

export default AddButton;
