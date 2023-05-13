const ethers = require("ethers");
const ABI = require("./abi.json");
const contractAddress = "0x4a8a038ef0c272b7e7e697a95ee7d8cbcd1b11f5";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x9afe727521d7d2e16b1d7af8733913783465d1efef23fe1e66f0f5961412a2d9";
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
  const mint = await contract
    .connect(Wallet)
    .mintRegisterCertificate(vin, vrp, uri, owner);
  console.log(mint);
}
generate();
