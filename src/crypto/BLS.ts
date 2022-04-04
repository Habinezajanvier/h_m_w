import {
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
import { randomBytes } from "crypto-browserify";
import { Bls12381G2KeyPair } from "@mattrglobal/bls12381-key-pair";



export default class BLS {

  static async generateKeyPair(seed?:Uint8Array){
    return new Promise<Bls12381G2KeyPair>(async (resolve, reject) =>{
      resolve(await Bls12381G2KeyPair.generate({seed:randomBytes(32)}))
    })
  }
  
  /**
   * Sign the payload with the given G2curve
   * @param payload
   * @param request
   * @returns
   */
  static async sign(keyPair:BlsKeyPair,messages:Uint8Array[]):Promise<Uint8Array> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await blsSign({ keyPair, messages }));        
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
   static async verifySignature(keyPair:Uint8Array, messages:Buffer[], signature:Buffer) {
    return Promise.resolve(
      await blsVerify({
        publicKey: keyPair,
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
  static async createProof(keypair:BlsKeyPair, request: BbsCreateProofRequest) {
    return new Promise(async (resolve, reject) => {
      try {
        const signature = blsCreateProof({
          signature: request.signature,
          publicKey: keypair.publicKey,
          messages: request.messages,
          nonce: request.nonce,
          revealed: request.revealed,
        });
        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async verifyProof(request: BbsVerifyProofRequest): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await blsVerifyProof(request)
        );
      } catch (error) {
        reject(error);
      }
    });
  }
 
  
}