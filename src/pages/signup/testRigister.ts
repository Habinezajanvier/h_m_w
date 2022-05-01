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
  const nanoId = nanoid(32);
  const createdTime = moment().toISOString();

  const mnemonicPhrase = await keypair.derive(target, KeyPairType.HYBRID);

  const sig = await keypair.blsSign([Buffer.from(JSON.stringify(meta))]);
  const pop = await keypair.createPop();
  // const passPhrase = await keypair.encodePkcs8(mnemonicPassword);

  const registerRequestObject = {
    payload: {
      id: nanoId,
      did: keypair.did,
      createdTime,
      proofOfPossession: pop,
      role: "admin",
      metaInformation: meta,
      odid: "",
      invited_by: "",
      event: undefined,
      signature: sig,
      mnemonicPhrase: mnemonicPhrase.mnemonic,
    },

    kayPair: {
      id: nanoId,
      did: keypair.did,
      keypair: keypair.encodePkcs8(),
      createdTime,
      proofOfPossession: pop,
      role: "admin",
      metaInformation: meta,
      odid: "",
      invited_by: "",
      event: undefined,
      signature: sig,
      mnemonicPhrase: mnemonicPhrase.mnemonic,
    },
  };

  return registerRequestObject;
};

// converting function into class
// export class KeyPairHandler {
//   // target: phone number
//   private target: string;
//   private mnemonicPassword?: string;
//   private keyPair: any;
//   public requestPayload: object;
//   public VCPayload: object;
//   public nanoId: string = nanoid(32);

//   constructor(target: string, mnemonicPassword?: string) {
//     this.target = target;
//     this.mnemonicPassword = mnemonicPassword;

//     this.testRegisterUser();
//   }

//   // generateKeypair
//   testRegisterUser  ()  {
//     this.keyPair = createKeypair();

//     const meta = {
//       firstName: "bhavish",
//       email: "bhavish@happymonk.co",
//       // other meta data to sign and send
//     };

//     const mnemonicPhrase = await this.keyPair.derive(
//       this.target,
//       KeyPairType.HYBRID
//     );

//     const sig = this.keyPair.blsSign([Buffer.from(JSON.stringify(meta))]);
//     const pop = this.keyPair.createPop();
//     const response = await Promise.all([sig, pop]);
//     const signature = {
//       id: nanoid(32),

//       proof: Buffer.from(response[0]).toString("base64"),
//     };

//     const resolvedPoP = { ...response[1] };
//     console.log("nweaajdkfjaklsd", resolvedPoP);

//     this.requestPayload = {
//       id: this.nanoId,
//       did: this.keyPair.did,
//       createdTime: moment().toISOString(),
//       proofOfPossession: resolvedPoP,
//       role: "admin",
//       metaInformation: meta,
//       odid: "",
//       invited_by: "",
//       event: undefined,
//       signature: signature,
//       mnemonicPhrase: mnemonicPhrase.mnemonic,
//     };

//     this.VCPayload = {
//       id: this.nanoId,
//       did: this.keyPair.did,
//       createdTime: moment().toISOString(),
//       proofOfPossession: resolvedPoP,
//       role: "admin",
//       metaInformation: meta,
//       odid: "",
//       invited_by: "",
//       event: undefined,
//       signature: signature,
//       mnemonicPhrase: mnemonicPhrase.mnemonic,
//       keyPair: this.keyPair.encodePkcs8("123456"),
//     };

//     // return registerRequestObject;
//   };

//   getRequestPayload () {
//     console.log("from class", this.requestPayload)
//     return this.requestPayload;
//   }

//   public getEncodedKeyPair() {
//     return this.VCPayload;
//   }

//   decodeKeyPair() {}
// }
