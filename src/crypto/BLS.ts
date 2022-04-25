import {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
  Bls12381ToBbsRequest,
  BbsKeyPair,
  BbsSignRequest,
  BlsBbsSignRequest,
  BbsVerifyRequest,
  BbsVerifyResult,
  BlsBbsVerifyRequest,
  BbsCreateProofRequest,
  BbsVerifyProofRequest
} from "@mattrglobal/bbs-signatures";
import { BlsKeyPair } from "@mattrglobal/bbs-signatures";
import { randomBytes } from "crypto";
import { Bls12381G2KeyPair } from "@mattrglobal/bls12381-key-pair";
import { documentLoader as defaultDocumentLoader } from '@digitalbazaar/cborld';

// import {
//   BbsBlsSignature2020,
//   BbsBlsSignatureProof2020,
//   deriveProof
// } from "@mattrglobal/jsonld-signatures-bbs";
import { sign, verify, purposes } from "jsonld-signatures";


export default class BLS {

  static async generateKeyPair(seed?: Uint8Array) {
    return new Promise<Bls12381G2KeyPair>(async (resolve, reject) => {
      try {
        resolve(await Bls12381G2KeyPair.generate({ seed: seed || randomBytes(32) }))
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Sign the payload with the given G2curve
   * @param payload
   * @param request
   * @returns
   */
  static async sign(keyPair: Bls12381G2KeyPair, messages: Uint8Array[]): Promise<Uint8Array> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await blsSign({
          keyPair: {
            secretKey: new Uint8Array(keyPair.privateKeyBuffer),
            publicKey: new Uint8Array(keyPair.publicKeyBuffer)
          }, messages
        }));
      } catch (error) {
        reject(error);
      }
    });
  }



  /**
   * Verify signature with the g2publicKey of the given DID
   * @param messages
   * @param signature
   * @returns
   */
  static async verifySignature(publicKey: Uint8Array, messages: Uint8Array[], signature: Uint8Array) {
    return Promise.resolve(
      await blsVerify({
        publicKey: publicKey,
        messages: messages,
        signature,
      })
    );
  }

  /**
   * Proof for the request
   * @param request
   * @returns
   */
  static async createProof(request: BbsCreateProofRequest): Promise<Uint8Array> {
    return new Promise<Uint8Array>(async (resolve, reject) => {
      try {
        resolve(await blsCreateProof(request));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async verifyProof(request: BbsVerifyProofRequest): Promise<BbsVerifyResult> {
    return new Promise<BbsVerifyResult>(async (resolve, reject) => {
      try {
        resolve(
          await blsVerifyProof(request)
        );
      } catch (error) {
        reject(error);
      }
    });
  }


  // commenting due to `@mattrglobal/jsonld-signatures-bbs` package error
  
  // static async createJSONSignature(keyPair: Bls12381G2KeyPair, inputDocument: Record<string, any>, suite?: any, purpose?: any, documentLoader?: any) {
  //   const result = await sign(inputDocument, {
  //     suite: suite || new BbsBlsSignature2020({ key: keyPair }),
  //     purpose: purpose || new purposes.AsserionProofPurpose(),
  //     defaultDocumentLoader
  //   })
  //   return result
  // }

  // static async verifyJSONSignature(inputDocument, suite?: any, purpose?: any, documentLoader?: any) {
  //   const verified = await verify(inputDocument, {
  //     suite: suite || new BbsBlsSignature2020(),
  //     purpose: purpose || new purposes.AssertionProofPurpose(),
  //     defaultDocumentLoader
  //   });
  //   return verified
  // }


  // static async createJSONProof(signedDocument: Record<string, any>, revealDocument: Record<string, any>, suite?: any, documentLoader?: any) {
  //   const derivedProof = await deriveProof(signedDocument, revealDocument, {
  //     suite: suite || new BbsBlsSignatureProof2020(),
  //     defaultDocumentLoader
  //   })
  //   return derivedProof;
  // }


  // static async verifyJSONProof(jsonProof: Record<string, any>, suite?: any, purpose?: any, documentLoader?: any) {
  //   const verifiedProof = await verify(jsonProof, {
  //     suite: suite || new BbsBlsSignatureProof2020(),
  //     purpose: purpose || new purpose.AssertionProofPurpose(),
  //     documentLoader
  //   })
  //   return verifiedProof
  // }


}