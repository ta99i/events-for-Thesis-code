const ethers = require("ethers");
const ABI = require("./ABIS/abi.json");
const contractAddress = "0x87722FdCC80967295334993B90426C2504C56441";
const provider = new ethers.providers.JsonRpcProvider("http://172.25.240.1:7545");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x4e70fd689b1481d4b332602f5c73916ce3a84f49e9bc7e266f2837a42ceeb952";
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
