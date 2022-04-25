import { randomBytes } from "tweetnacl";
import { createKeypair, KeyPairType } from "../../crypto/KeyPair";
import { nanoid } from "nanoid";
import moment from "moment";

export const testRegisterUser = async (
  target: string,
  mnemonicPassword: string
) => {
  const keypair = createKeypair();
  const meta = {
    firstName: "bhavish",
    email: "bhavish@happymonk.co",
    // other meta data to sign and send
  };
  const nonce = randomBytes(24);

  const mnemonicPhrase = await keypair.derive(target, KeyPairType.HYBRID);

  const sig = keypair.blsSign([Buffer.from(JSON.stringify(meta))]);
  const pop = keypair.createPop();
  const response = await Promise.all([sig, pop]);
  const signature = {
    id: nanoid(32),
    // nonce: Buffer.from(nonce).toString("base64"),
    // aud: keypair.did,
    proof: Buffer.from(response[0]).toString("base64"),
    // proof: Buffer.from(await keypair.proof(signature,nonce)).toString('base64')
  };

  const resolvedPoP = { ...response[1] };
  console.log("nweaajdkfjaklsd", resolvedPoP);

  // const passPhrase = await keypair.encodePkcs8(mnemonicPassword);

  const registerRequestObject = {
    id: nanoid(32),
    did: keypair.did,
    createdTime: moment().toISOString(),
    proofOfPossession: resolvedPoP,
    role: "admin",
    metaInformation: meta,
    odid: "",
    invited_by: "",
    event: undefined,
    signature: signature,
    mnemonicPhrase: mnemonicPhrase.mnemonic,
  };

  return registerRequestObject;
};
