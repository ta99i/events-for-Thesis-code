const mongoose = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27017/";

async function SearchOnRC(vin, vrp) {
  const client = new mongoose(uri);
  const database = client.db("Police");

  try {
    const RegisterCertificats = database.collection("RegisterCertificats");
    if (vin === "") {
      vin = "-1";
    }
    const queryRC = { $or: [{ vin: vin }, { vrp: vrp }] };
    const resRC = await RegisterCertificats.find(queryRC).toArray();
    await client.close();
    return resRC;
  } catch (err) {
    //console.log(err);
  }
  console.log("FRom sorc : ", RCValidition);

  return RCValidition;
}
async function SearchOnCitizens(Owner) {
  const client = new mongoose(uri);

  const database = client.db("Police");
  try {
    const Citizens = database.collection("Citizens");
    const queryCitizens = { nin: Owner };
    const resC = await Citizens.find(queryCitizens).toArray();
    await client.close();
    return resC;
  } catch (err) {
    //console.log(err);
  }

  return CitizensValidition;
}

module.exports = { SearchOnRC, SearchOnCitizens };
//Search("123456", "123456", "123456", "DZ12345", "DZ1234");
