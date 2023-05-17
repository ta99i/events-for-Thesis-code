const ethers = require("ethers");
const ABI = require("../ABIS/abi.json");
const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a";
const Wallet = new ethers.Wallet(PK, provider);
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
async function transfer() {
  const currentid = (await contract.getCurrentcertificateId()) - 1;
  const trc = await contract.getTemporaryRegisterCertificates(currentid);
  const owner = generateRandomString(10);
  const state = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

  const transfer = await contract
    .connect(Wallet)
    .transfer(trc[0], owner, state);
  console.log(transfer);
  //const owner = "DZ12345";
}
transfer();
