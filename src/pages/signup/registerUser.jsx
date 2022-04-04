import { randomBytes } from "tweetnacl";
import { createKeypair, KeyPairType } from "../../crypto/KeyPair";

export const registerUser = async (phonenumber) => {
  // Assuming the phone number is taken and the OTP is verified.
  // Exisiting Seed is used, or we can let the keypair generate one for us the first time.
  const keypair = createKeypair();
  await keypair.derive(phonenumber, KeyPairType.HYBRID);
  const seed = randomBytes(32);
  await keypair.derive(phonenumber, KeyPairType.HYBRID, seed);
  const pop = keypair.createPop();
  // THIS WILL GIVE US ALL THE REQUIRED FUNCTIONALITY FOR THE KEYPAIR FUNCTIONS AS DEFINED IN THE INTERFACE CLASS.
  const proofOfPossession = Buffer.from(keypair.createPop()).toString("base64");
  const meta = {
    // Fill all the user information as per the meta interface
    firstname: "Rishabh",
  };
  const signature = Buffer.from(
    keypair.blsSign(Buffer.from(JSON.stringfy(meta)))
  ).toString("base64");
  const did = keypair.did;
  console.log("new did", did);
  // this will give you all the required information to register a user
  // Pass this to the register Mutation and the RegisterResponse will be thrown back with the proof of insertion and proof of identity for the user.

  // Now the user can be verified for his ePersonalAddress, DID and eOrganisationAddress) on the verify(did| address :string) query.
};
