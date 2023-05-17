const ethers = require("ethers");

const HashAcceptedMessage = (id, vin, vrp, uri, oldOwner, newOwner) => {
  const encodePackedpacked = ethers.utils.solidityPack(
    ["uint256", "string", "string", "string", "string", "string"],
    [id, vin, vrp, uri, oldOwner, newOwner]
  );
  const hash = ethers.utils.keccak256(encodePackedpacked);
  console.log("message for rc : ", id, "hashed with Accepted", hash);
  return hash;
};
const HashDeclinedMessage = (id) => {
  const encodePackedpacked = ethers.utils.solidityPack(
    ["uint256", "string"],
    [id, "Declined"]
  );
  const hash = ethers.utils.keccak256(encodePackedpacked);
  console.log("message for rc : ", id, "hashed with Declined", hash);

  return hash;
};
module.exports = { HashAcceptedMessage, HashDeclinedMessage };
