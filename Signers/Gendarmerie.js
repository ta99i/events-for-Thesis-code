const ethers = require("ethers");
const ABI = require("../ABIS/abi.json");
require("dotenv").config();
const { HashAcceptedMessage, HashDeclinedMessage } = require("../Security/Hashing");
const { SearchOnRC, SearchOnCitizens } = require("../DAL/AccessControlLayer");

const contractAddress = "0x87722FdCC80967295334993B90426C2504C56441";
const provider = new ethers.providers.JsonRpcProvider("http://172.25.240.1:7545");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0xcfaa140aa5b3187a3e242648ecaf69b05fe7f15bef9020a577757a1d56c88466";
const Wallet = new ethers.Wallet(PK, provider);
const SignMessage = async (hash) => {
  const signMessage = await Wallet.signMessage(ethers.utils.arrayify(hash));
  return signMessage;
};
async function getTransfer() {
  contract.on("Transfer", async (from, to, value, event) => {
    const id = ethers.BigNumber.from(to.args[0]).toNumber();
    //get information from smart contract
    const trc = await contract.getTemporaryRegisterCertificates_Government(id);
    const vri = trc[1];
    const vrp = trc[2];
    const uri = trc[3];
    const oldOwner = trc[4];
    const newOwner = trc[5];
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
        return await SearchOnRC(vri, vrp);
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
        ? HashAcceptedMessage(id, vri, vrp, uri, oldOwner, newOwner)
        : HashDeclinedMessage(id);
    //Sign hash
    const signed_Meesage = await SignMessage(hash);
    console.log(await SignMessage(hash));
    await contract.connect(Wallet).Siging(
      id,
      3,
      ethers.utils.formatBytes32String("GENDARMERIE"),
      signed_Meesage
    );
    const rc = await contract.getTemporaryRegisterCertificates_Government(id);
    console.log(rc);
  });
}

getTransfer();
