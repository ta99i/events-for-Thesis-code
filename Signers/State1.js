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
const PK = "0x4e70fd689b1481d4b332602f5c73916ce3a84f49e9bc7e266f2837a42ceeb952";
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
    //const newOwner = "DZ12345";
    console.log("Register Certificate : ", id);
    //compare with database
    let transfer = [];
    await SearchOnCitizens(oldOwner)
      .then((res) => {
        if (res.length == 0 || res[0].canTransfer) transfer.push(true);
        else transfer.push(false);
      })
      .then(async () => {
        return await SearchOnCitizens(newOwner);
      })
      .then((res) => {
        if (res.length == 0 || res[0].canTransfer) transfer.push(true);
        else transfer.push(false);
      })
      .then(async () => {
        return await SearchOnRC(vin, vrp);
      })
      .then((res) => {
        if (res.length == 2) {
          console.log("Please verifi request for register card number : ", id);
          transfer.push(false);
        } else if (res.length == 0 || res[0].Status == true) {
          transfer.push(true);
        } else {
          transfer.push(false);
        }
      });
    console.log(transfer);
    //hash resultat
    console.log(transfer[0] && transfer[1] && transfer[2]);
    const hash =
      transfer[0] && transfer[1] && transfer[2]
        ? HashAcceptedMessage(
            id,
            vin,
            vrp,
            uri,
            oldOwner,
            newOwner,
            oldState,
            newState
          )
        : HashDeclinedMessage(id);
    //Sign hash
    const signed_Meesage = await SignMessage(hash);
    console.log(await SignMessage(hash));
    await contract
      .connect(Wallet)
      .Siging(
        id,
        1,
        ethers.utils.formatBytes32String("GOVERNMENT"),
        signed_Meesage
      );
    const rc = await contract.getTemporaryRegisterCertificates(id);
    console.log(rc);
  });
}

getTransfer();
