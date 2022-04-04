import { SignKeyPair, BoxKeyPair } from "tweetnacl";
import {
  Meta,
  KeyPairType,
  BaseKeyPair
} from "../KeyPair";
import  DidResolutionDocument  from "../classes/DidResolutionDocument";
import { Bls12381G2KeyPair } from "@mattrglobal/bls12381-key-pair";
import { JsonWebKey } from "@mattrglobal/bls12381-key-pair/lib/types";

/**
 * Interface defination for ChokidrKeyPair
 * Keypairs : Single- ed25519 and snrockle- skepc, HYBRID -- signaturekeypair : bls12381 edSignature : ed25519SignatureKeyPair
 * encryptionkeypair - x25519
 *
 * 	did:ckdr:"type""curves"ed25519sig+bls12381 -- address
 *
 *
 *  Keypair | handshake | single verification | multisignature verification
 *
 *
 */

export interface KeyPair {
  // DID
  readonly did: string;
  readonly seed: Uint8Array;
  readonly meta: Meta; // email. phone, temporary transaction data associated with the did
  readonly isLocked: boolean;
  readonly type: KeyPairType;
  readonly encryptionKeyPair: BoxKeyPair;
  readonly signatureKeyPair: Bls12381G2KeyPair;
  readonly ed25519SignatureKeyPair: SignKeyPair;
  readonly verifierMode: boolean;

  readonly eAddress:string;
  

  authenticate(params: any): Promise<DidResolutionDocument>;

  /**
   * Create proof of Posession for the given key
   *
   */
  createPop(): Promise<JsonWebKey>;
  /**
   * Verify Proof of posession for the given did
   * @param pop
   */
  verifyPop(pop: JsonWebKey, did: string): Promise<Boolean>;

  /**
   * 
   * @param did 
   * @param signatureKey 
   * @param encryptionKey 
   */
  resolve(
    did?: string,
    signatureKey?: Uint8Array,
    encryptionKey?: Uint8Array
  ): Promise<DidResolutionDocument>;

  /**
   * Decode the given pkcs8 with the given password value
   */
  decodePkcs8(bytes: Uint8Array, password?: string): Promise<BaseKeyPair>;
  /**
   * Encodes the currentkeypair into a pkcs8 encoded string which can be used for storage
   * @param password
   */
  encodePkcs8(password?: string): Promise<Uint8Array>;
  /**
   * Derive Keys for the given seed, uniqueString and meta against the particular key
   * Init Funciton. Must Call before all the other calls. Returns
   * createKeyPair().derive(target,seed)
   * @param seed
   * @param uniqueKey
   * @param meta
   * @returns
   */
  derive(
    uniqueKey: string, // phonenumber, organsiationid, deviceserialid
    type: KeyPairType, // single/ hybrid
    seed?: Uint8Array, // seed . 32 bytes of random
    meta?: Meta, //
    path?: string //
  ): Promise<BaseKeyPair>;
  /**
   * Lock the current keypair.
   *
   */
  lock(): void;
  /**
   * Unlock the current keypair
   */
  unlock(): void;
  /**
   * Set meta data associated to the keypair
   * @param meta
   */
  setMeta(meta: Meta): void;
  /**
   * Returns the keypair in JSON format
   * useful to storing and other activities.
   */
  toJson();

  
  /**
   * Sign the payload using ed25519 Signature
   * @param clearText
   */
  edsSign(clearText: Uint8Array): Promise<Uint8Array>;

  /**
   * Verify the given data on ed25519 Curve
   * @param clearText
   * @param signature
   * @param did
   */
  edsVerifySignature(
    clearText: Uint8Array,
    signature: Uint8Array,
    did?: string
  ): Promise<boolean>;
  /**
   * Sign the document using the BLS Signature G1 Curve. Hash is taken on the G1 Point
   * @param clearText
   * @returns string the signature in base64encoded format
   */
  blsSign(clearText: Buffer[]): Promise<Uint8Array>;
  /**
   * Verify the signature
   * @param clearText
   * @param signature
   * @param did
   */
  blsVerifySignature(
    clearText: Uint8Array,
    signature: Uint8Array,
    did?: string
  ): Promise<boolean>;
  // /**
  //  * Verify the batch signature for given clearText, Signatures and DID.
  //  * The DID format must adher to ckdr did's in the system. If the dids do not match the specification, the function throws an error.
  //  * @param clearText
  //  * @param signatures
  //  * @param publickeys
  //  */
  // blsVerifyBatchSignature(
  //   clearText: Uint8Array,
  //   signatures: Uint8Array,
  //   dids: Uint8Array | string[]
  // ): Promise<boolean>;
  

}
