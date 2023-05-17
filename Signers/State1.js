const ethers = require("ethers");
const ABI = require("../ABIS/abi.json");
require("dotenv").config();
const {
  HashAcceptedMessage,
  HashDeclinedMessage,
} = require("../Security/Hashing");
const { SearchOnRC, SearchOnCitizens } = require("../DAL/AccessControlLayer");

const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const Wallet = new ethers.Wallet(PK, provider);
const SignMessage = async (hash) => {
  const signMessage = await Wallet.signMessage(ethers.utils.arrayify(hash));
  return signMessage;
};
async function getTransfer() {
  contract.on("Transfer", async (from, to, value, event) => {
    const id = ethers.BigNumber.from(to.args[0]).toNumber();
    //get information from smart contract
    const trc = await contract.getTemporaryRegisterCertificates(id);
    const vin = trc[2];
    const vrp = trc[3];
    const uri = trc[4];
    const oldOwner = trc[5];
    const newOwner = trc[6];
    const oldState = trc[7];
    const newState = trc[8];
    //const newOwner = "DZ12345";
    if (newState == address) {
      console.log("Register Certificate : ", id);
      //compare with database

      const hash = HashAcceptedMessage(
        id,
        vin,
        vrp,
        uri,
        oldOwner,
        newOwner,
        oldState,
        newState
      );
      //Sign hash
      const signed_Meesage = await SignMessage(hash);
      console.log(await SignMessage(hash));
      await contract
        .connect(Wallet)
        .Siging(
          id,
          1,
          ethers.utils.formatBytes32String("STATES"),
          signed_Meesage
        );
      const rc = await contract.getTemporaryRegisterCertificates(id);
      console.log(rc);
    }
  });
}

getTransfer();
