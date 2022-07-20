import { useState, useEffect } from "react";
import Instance from "./../../utils/ContractInstance";
import "./AddButton.css";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div id="bootstrap-overrides">
      <form>
        <div class="inputBar">
          <input
            required=""
            placeholder="Recipient's Address"
            autoComplete="off"
            className="input"
            onChange={(event) => setInputValue(event.target.value)}
          ></input>

          <button
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            className="button"
          >
            {isLoading ? "Loading…" : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddButton;
