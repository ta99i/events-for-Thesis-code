const ethers = require("ethers");
const ABI = require("../ABIS/abi.json");
const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
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
async function generate() {
  const vin = generateRandomString(10);
  //const vin = "VW12345";
  const vrp = generateRandomString(10);
  //const vrp = "12344-123-00";

  const uri = generateRandomString(10);
  const owner = generateRandomString(10);
  //const owner = "DZ12345";
  const state = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const mint = await contract
    .connect(Wallet)
    .mintRegisterCertificate(state, vin, vrp, uri, owner);
  console.log(mint);
}
generate();
