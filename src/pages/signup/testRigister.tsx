import { randomBytes } from "tweetnacl";
import { createKeypair, KeyPairType } from "../../crypto/KeyPair";
import { nanoid } from "nanoid";
import moment from "moment";

export const testRegisterUser = async () => {
  const keypair = createKeypair();
  const target = "+918296133177";
  const meta = {
    firstname: "bhavish",
    email: "bhavish@happymonk.co",
    // other meta data to sign and send
  };
  const nonce = randomBytes(24);
  await keypair.derive(target, KeyPairType.HYBRID);
  const sig = keypair.blsSign([Buffer.from(JSON.stringify(meta))]);
  const pop = keypair.createPop();
  const response = await Promise.all([sig, pop]);
  const signature = {
    nonce: nonce,
    signer: [keypair.did],
    signature: Buffer.from(response[0]).toString("base64"),
    // proof: Buffer.from(await keypair.proof(signature,nonce)).toString('base64')
  };

  const registerRequestObject = {
    id: nanoid(32),
    did: keypair.did,
    createdTime: moment().toISOString(),
    proofOfPossession: response[1],
    role: "admin",
    metaInformation: meta,
    odid: "",
    invited_by: "",
    event: undefined,
    signature: signature,
  };

  return registerRequestObject;
};
