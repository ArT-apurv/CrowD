import ContractInfo from "./../artifacts/contracts/Campaign.sol/Campaign.json";
const { web3 } = require("./web3API");

const CampaignInstance = (address) => {
  return new web3.eth.Contract(ContractInfo.abi, address);
};

export default CampaignInstance;
