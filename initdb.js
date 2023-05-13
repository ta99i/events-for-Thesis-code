const mongoose = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27017/";
const init = async () => {
  const client = new mongoose(uri);
  const database = client.db("test");
  try {
    const RegisterCertificats = database.collection("RegisterCertificats");
    const resRC = await RegisterCertificats.find(queryRC).toArray();
    await client.close();
    return resRC;
  } catch (err) {
    //console.log(err);
  }
  console.log("FRom sorc : ", RCValidition);

  return RCValidition;
};
