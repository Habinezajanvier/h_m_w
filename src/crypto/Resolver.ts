import { base64 } from "multiformats/bases/base64";
import  DidResolutionDocument  from "./classes/DidResolutionDocument";
import { Document } from "./classes/Document";
import { verifyDIDFormat, decodeDid, getAddress } from "./KeyPair";
import moment from "moment";

const DID_CBOR = "application/did+cbor";

export default function Resolver() {
  return {
    keyDidToDoc(did: string): Document {
      try {
        if (!verifyDIDFormat(did)) throw new Error("Invalid DID");
        const keyset = decodeDid(did);
        const addr = `did:ckdr:${base64.encode(getAddress(did))}`;
        const d = Object.assign({
          id: did,
          authentication: [addr],
          capabilityDelegation: [addr],
          capabilityInvocation: [addr],
          assertionMethod: [
            {
              id: `did:ckdr:${base64.encode(
                keyset.signaturePublickey.serialize()
              )}`,
              type: "BLSG2Verification2021",
              controller: [addr],
              publicKeyBase64: [addr],
            },
          ],
          keyAgreement: [
            {
              id: `did:ckdr:${base64.encode(
                keyset.signaturePublickey.serialize()
              )}`,
              type: "BLSBBSVerification",
              controller: addr,
              publicKeyBase64: `${base64.encode(
                keyset.signaturePublickey.serialize()
              )}`,
            },
            {
              id: `did:ckdr:${base64.encode(
                keyset.encryptionPublickey.slice(0, 32)
              )}`,
              type: "x25519KeyAgreement",
              controller: addr,
              publicKeyBase64: `${base64.encode(
                keyset.encryptionPublickey.slice(0, 32)
              )}`,
            },
          ],
          verificationMethod: [
            {
              id: `did:ckdr:${base64.encode(keyset.encryptionPublickey)}`,
              type: "CKDRVerificationKey",
              controller: addr,
              publicKeyBase64: `${base64.encode(keyset.encryptionPublickey)}`,
            },
          ],
        }) as Document;
        return d;
      } catch (error) {
        throw error;
      }
    },
    async resolve(did: string, options?: any): Promise<DidResolutionDocument> {
      return new Promise<DidResolutionDocument>(async (resolve, reject) => {
        const contentType = options?.accept || DID_CBOR;
        const response = Object.assign({
          didResolutionMetadata: { contentType },
          didDocument: null,
          didDocumentMetadata: {
            created: moment().toISOString(),
          },
        }) as DidResolutionDocument;
        try {
          response.didDocument = this.keyDidToDoc(did);
        } catch (error) {
          response.didResolutionMetadata.error = "Invalid DID";
          // response.didResolutionMetadata.message = error.toString();
        }
        resolve(response);
      });
    },
  };
}
