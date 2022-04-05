import { randomBytes } from "tweetnacl";
import { createKeypair, KeyPairType } from "../../crypto/KeyPair";
import { nanoid } from "nanoid";

export const registerUser = async (phonenumber: string) => {
  // console.log(phonenumber);

  const keypair = createKeypair();
  let driveData = await keypair.derive(phonenumber, KeyPairType.HYBRID);
  // console.log("driveData", driveData);
  const seed = randomBytes(32);
  // const pop = keypair.createPop();

  // console.log("keypair", keypair);
  const proofOfPossession = await keypair.createPop();
  const meta = {
    firstname: "Rishabh",
  };

  const signature = Buffer.from(
    await keypair.blsSign([Buffer.from(JSON.stringify(meta))])
  ).toString("base64");
  const did = keypair.did;
  // console.log("new did", did);
  // console.log("sign", signature);
  // console.log("pop", proofOfPossession);

  const passPhrase = await keypair.encodePkcs8("123456");
  // console.log("passPhrase", passPhrase);
  // console.log("id", nanoid(32));

  return {
    id: nanoid(32),
    did,
    role: "admin",
    createdTime: new Date().toISOString(),
    metaInformation: {
      firstName: "Rishabh",
      lastName: "Singh",
      phoneNumber: phonenumber,
    },
    proofOfPossession: proofOfPossession.x,
    signature: {
      id: nanoid(32),
      algo: nanoid(32),
      proof: proofOfPossession.x,
    },
  };
};
