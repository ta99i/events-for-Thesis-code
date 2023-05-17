const ethers = require("ethers");
const ABI = require("./ABIS/abi.json");
const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const contract = new ethers.Contract(contractAddress, ABI.abi, provider);
const PK = "0x28aa6dffe5f5b813f4dc744ecb845cd8305fce3a6da286e406e3164c85be0e62";
const Wallet = new ethers.Wallet(PK, provider);
const SignMessage = async (hash) => {
  const signMessage = await Wallet.signMessage(ethers.utils.arrayify(hash));
  return signMessage;
};
const {
  HashAcceptedMessage,
  HashDeclinedMessage,
} = require("./Security/Hashing");
async function main() {
  console.log(ethers.utils.formatBytes32String("EMPLOYER"));
  const hash = HashAcceptedMessage(1, "1", "2", "3", "4", "4");
  const signed_Meesage = await SignMessage(hash);
  console.log(signed_Meesage);
  // console.log(await contract.getTemporaryRegisterCertificates(30));
}
main();
