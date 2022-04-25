import * as bip39 from "bip39";
import { deriveKey } from "@stablelib/scrypt";
import { sign, SignKeyPair, BoxKeyPair, box, secretbox } from "tweetnacl";
// Web : Cryto
// Reactnative- Cryto -RandomBytes()
import { randomBytes } from "@stablelib/random";
import { Bls12381G2KeyPair } from "@mattrglobal/bls12381-key-pair";
import { JsonWebKey } from "@mattrglobal/bls12381-key-pair/lib/types";
import { DateTime } from "luxon";
import { assert } from "ts-essentials";
import {blakehasher} from './blakehasher';
// Local Imports.

import { KeyPair } from "./interface/KeyPair";
import DidResolutionDocument from "./classes/DidResolutionDocument";
import Resolver from "./Resolver";
import BLS from "./BLS";
import { Signature } from "./classes/Signature";
import { Proof } from "./classes/Proof";
import { nanoid } from "nanoid";
import { blsVerifyProof } from "@mattrglobal/bbs-signatures";

/**
 * General Constants
 */
export const SALT_LENGTH = 16;
export const SEED_LENGTH = 32;
export const BLSPRIVATEKEYLENGTH = 32;
export const EDPRIVATEKEYLENGTH = 64;
export const NONCE_LENGTH = 24;
export const ENCRYPTIONALGORITHM = "xsalsa20-poly1305";
export const GENISISBLOCK = "root";
export const DEFAULTEXPIRY = 11352960000;
export const ApplicationType = "@application/cbor";
export const DEFAULTCONTEXT = "http://www.chokidr.ml/xmlns";
export const DST_POP = "BLS_POP_BLS12381G2_XMD:SHA-256_SSWU_RO_POP_";
export const CKDR_SMALL_ADDRESS = "chokidr";
export const ADDRESS_SEPERATOR = "@";
export const addressRegExPattern = `/^[a-zA-Z]+${ADDRESS_SEPERATOR}[a-zA-Z]+$/i`;

/**
 * Regex for DID
 */
export const DIDPLACEHOLDER = `did`;
export const CKDRPLACEHOLDER = `ckdr`;
export const BASE64REGEX = `(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?`;
export const regexPattern = `^(${DIDPLACEHOLDER}):(${CKDRPLACEHOLDER}):(${BASE64REGEX})$`;
export const DEFAULT_NETWORKIDENTIFIER = "public";

/**
 *
 */
export const PKCS8_DIVIDER = new Uint8Array([161, 35, 3, 33, 0]);
/**
 *
 */
export const PKCS8_HEADER = new Uint8Array([
  48, 83, 2, 1, 1, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32,
]);

export enum MSG_HEADER {
  STRING = "0xSS",
  OCTATE = "0xS0",
  OBJECT = "0xOB",
}

/**
 * Keypair Type Enum
 */
export enum KeyPairType {
  SINGLE = "SINGLE", // generates ed25519 Only keys
  HYBRID = "HYBRID",
}

/**
 * Keyset Interface
 */
export type keySet = {
  key1: Uint8Array;
  key2: Uint8Array;
};

/**
 * Basekeypair interface
 */
export interface BaseKeyPair {
  signatureKeyPair: Bls12381G2KeyPair;
  ed25519SignatureKeyPair: SignKeyPair;
  encryptionKeyPair?: BoxKeyPair;
  target?: string;
  seed?: Uint8Array | null;
  mnemonic?: string;
}

/**
 *
 */
export interface AuthParams {
  audiance?: string[];
  path?: string;
  target?: string;
  nonce?: string;
}

/**
 * PublicKeypair interface
 */
export interface PublickeySet {
  encryptionPublickey: Uint8Array;
  signaturePublickey: Uint8Array;
}

/**
 * Meta type
 */
export type Meta = Record<string, unknown>;


export interface Response {
  signature: Signature;
  bytes: Uint8Array;
}
/**
 * Get currentAddress from the did
 * @param did
 */
export function getAddress(did: string): Uint8Array {
  try {
    const ckdrcodec = 0xa11; // chokidrcodec
    const edcodec = 0xed;
    const blscodec = 0xea;
    const match = new RegExp(regexPattern, "dg").exec(did);
    if (
      match?.length != 4 ||
      match[1] != DIDPLACEHOLDER ||
      match[2] != CKDRPLACEHOLDER
    )
      throw new Error("Invalid DID Format");
    // const addr = u8a.fromString(match[3], "base64");
    const addr = Buffer.from(match[3], "base64");
    console.log("address", addr);
    // TODO: Confirm Codec checking
    // if (addr[0] != ckdrcodec || addr[1] != edcodec || addr[2] != blscodec)
    //   throw new Error("Invalid Codec");
    // if(u8a.compare(addr,ckdrcodec) != 0) throw
    return addr;
  } catch (error) {
    return error;
  }
}
/**
 * Verify DID
 * @param did
 * @returns
 */
export function verifyDIDFormat(did: string) {
  try {
    return new RegExp(regexPattern, "dg").test(did);
  } catch (error) {
    return error;
  }
}

/**
 * Encode with scrypt
 * @param digest
 * @param salt
 * @param n
 * @param r
 * @param p
 * @param dkLen
 * @returns
 */
export function encodescrypt(
  digest: Uint8Array,
  salt: Uint8Array,
  n: number = 32,
  r: number = 8,
  p: number = 2,
  dkLen: number = 64
) {
  return deriveKey(digest, salt, n, r, p, dkLen);
}

/**
 * Splits the given key into two halfs
 * @param key
 * @returns
 */
export function spiltkey(key: Uint8Array): keySet {
  if (key.length != 64) throw new Error("Keylength Must be of 64");
  console.log(`Sub Length`, key.subarray(32, key.length + 1).length);
  return {
    key1: key.subarray(0, 32),
    key2: key.subarray(32, key.length + 1),
  };
}

/**
 * Rewire of DID function with encode and decode
 * @returns
 */
export class DID implements DID {
  static encode(
    keys: Uint8Array[],
    networkIdentifier: string = DEFAULT_NETWORKIDENTIFIER
  ): string {
    try {
      if (keys.length > 2 || keys.length == 0 || keys.length != 2)
        throw new Error("key length must be equal to 2 ");
      let key: Buffer;
      const padding = new Uint8Array(4);
      padding[0] = 0xa11;
      padding[1] = 0xed;
      if ((keys.length = 1)) {
        key = Buffer.concat([padding, keys[0]]);
      } else if ((keys.length = 2)) {
        padding[2] = 0xea;
        key = Buffer.concat([padding, keys[0], keys[1]]);
      }
      return `did:ckdr:${networkIdentifier}:${key.toString("base64")}`;
    } catch (error) {
      throw error;
    }
  }
  static decode(did: string): PublickeySet {
    try {
      if (!this.verify(did)) throw new Error(`Invalid DID format`);
      const buffer = Buffer.from(did.split(":")[3]);
      const edpub = buffer.slice(3, 35);
      const blspb = buffer.slice(36, buffer.length);
      return {
        encryptionPublickey: edpub,
        signaturePublickey: blspb,
      };
    } catch (error) {
      throw error;
    }
  }
  static verify(did: string): boolean {
    try {
      return new RegExp(regexPattern, "dg").test(did);
    } catch (error) {
      return false;
    }
  }
}

/**
 * Encode DID for the given encryption publickey and signaturekey
 * @param edspublickey
 * @param blspublickey
 * @returns
 */
export function encodeDID(
  edspublickey: Uint8Array,
  blspublickey?: Uint8Array
): string {
  let bytes: Buffer;
  const padding = new Uint8Array(4);
  padding[0] = 0xa11; // chokidrcodec
  padding[1] = 0xed;
  if (blspublickey) {
    padding[2] = 0xea;
    bytes = Buffer.concat([padding, edspublickey, blspublickey]);
    return `did:ckdr:${bytes.toString("base64")}`;
  }
  bytes = Buffer.concat([padding, edspublickey]);
  return `did:ckdr:${bytes.toString("base64")}`;
}

/**
 * Decodes DID and returns the public in raw bytes
 * @param did
 * @returns
 */
export function decodeDid(did: string): PublickeySet {
  try {
    if (!verifyDIDFormat(did)) throw new Error("Invalid DID format");
    const keyinbytes = Buffer.from(did.split(":")[2], "base64");
    const edpub = keyinbytes.slice(3, 35);
    const blspb = keyinbytes.slice(36, keyinbytes.length);
    return {
      encryptionPublickey: edpub,
      signaturePublickey: blspb,
    };
  } catch (error) {
    return error;
  }
}

export class Address {
  /**
   * Generate User address for the data given.
   * Pass Organisation Address to create organisation address format
   * @param data
   * @param organisationAddress
   * @returns
   */
  static generateAddress(data: string, organisationAddress?: string): string {
    try {
      const orgAdd = organisationAddress
        ? organisationAddress
        : CKDR_SMALL_ADDRESS;
      const address = `${data}${ADDRESS_SEPERATOR}${orgAdd}`;
      return address;
    } catch (error) {
      return error;
    }
  }

  static verifyAddressFormat(address: string) {
    try {
      return new RegExp(addressRegExPattern, "idg").test(address);
    } catch (error) {
      return error;
    }
  }
}

/**
 * Creates a new keypair function holding the did and encryption and decryption
 * @returns
 */
export function createKeypair(): KeyPair {
  let did: string;
  let seed: Uint8Array;
  let meta: Meta;
  let mnemonic: string;
  let isLocked: boolean;
  let type: KeyPairType;
  let signatureKeyPair: Bls12381G2KeyPair;
  let encryptionKeyPair: BoxKeyPair;
  let ed25519SignatureKeyPair: SignKeyPair;
  let target: string;
  let verifierMode: boolean = false;
  let eAddress: string;
  return {
    get eAddress(): string {
      return eAddress;
    },
    get did(): string {
      return did;
    },
    meta,
    get isLocked(): boolean {
      return isLocked;
    },
    get verifierMode(): boolean {
      return this._veriferMode;
    },
    set verifierMode(v: boolean) {
      verifierMode = v;
    },
    get type(): KeyPairType {
      if (!type) throw new Error("Keypair type not set");
      return type;
    },
    get signatureKeyPair(): Bls12381G2KeyPair {
      if (!signatureKeyPair) throw new Error("Keypair type not set");
      return signatureKeyPair;
    },
    get ed25519SignatureKeyPair(): SignKeyPair {
      if (!ed25519SignatureKeyPair) throw new Error("SignatureKeypair not set");
      return ed25519SignatureKeyPair;
    },
    get encryptionKeyPair(): BoxKeyPair {
      if (!encryptionKeyPair) throw new Error("Encryption keypair not set");
      return encryptionKeyPair;
    },
    get seed() {
      return seed;
    },
    async updateAddress(
      address: string,
      organisationAddress?: string
    ): Promise<boolean> {
      eAddress = Address.generateAddress(address, organisationAddress);
      return Address.verifyAddressFormat(eAddress);
    },
    async authenticate(params?: AuthParams): Promise<DidResolutionDocument> {
      return new Promise<DidResolutionDocument>((resolve, reject) => {
        try {
          if (!params || params.target) return;
          if (!did) throw new Error(`Did not formed`);
          const nonce = Buffer.from(randomBytes(32));
          const document = this.createBlock({
            did,
            aud: params?.audiance,
            nonce: nonce,
            paths: params?.path,
            exp: DateTime.now().toISO(),
            target: params?.target,
          });
          // verify the document that is created
          const verifiedDocument = this.decodeBlock(document.documentInBytes);
          if (verifiedDocument.verified) resolve(this.resolve(did));
          else reject("InvalidDocument");
        } catch (error) {
          reject(error);
        }
      });
    },
    async createPop(): Promise<JsonWebKey> {
      return new Promise<JsonWebKey>(async (resolve, reject) => {
        try {
          if (!did) throw new Error(`Keypair did not generated`);
          const jwk = signatureKeyPair.publicKeyJwk;
          resolve(jwk);
        } catch (error) {
          reject(error);
        }
      });
    },
    async verifyPop(pop: JsonWebKey, did: string): Promise<Boolean> {
      return new Promise<Boolean>(async (resolve, reject) => {
        try {
          if (!pop) throw new Error(`JsonWebKey must be provided`);
          const decodedDid = decodeDid(did);
          const keypair = await Bls12381G2KeyPair.fromJwk({
            publicKeyJwk: pop,
          });
          if (
            Buffer.from(decodedDid.signaturePublickey).equals(
              keypair.publicKeyBuffer
            )
          )
            resolve(true);
          else resolve(false);
        } catch (error) {
          reject(false);
        }
      });
    },
    async getFingerPrint(): Promise<string> {
      return signatureKeyPair.fingerprint();
    },
    async verifyFingerPrint(
      fingerprint: string,
      did: string
    ): Promise<boolean> {
      const decodedDid = decodeDid(did);
      const kp = Bls12381G2KeyPair.fromFingerprint({
        fingerprint: fingerprint,
      });
      if (Buffer.from(kp.publicKeyBuffer).equals(decodedDid.signaturePublickey))
        return true;
      return false;
    },
    async resolve(did: string): Promise<DidResolutionDocument> {
      return new Promise<DidResolutionDocument>((resolve, reject) => {
        try {
          const resolutionDocument = Resolver().resolve(did);
          resolve(resolutionDocument);
        } catch (error) {
          reject(error);
        }
      });
    },
    async derive(
      uniqueKey: string,
      type: KeyPairType,
      bytes?: Uint8Array,
      m?: Meta,
      path?: string
    ): Promise<BaseKeyPair> {
      if (!uniqueKey)
        throw new Error("Please provide unique key to generate keypair");
      if (path) path = path;
      if (meta) meta = Object.assign(meta, m);
      if (uniqueKey) target = uniqueKey;
      seed = bytes || randomBytes(32);
      mnemonic = bip39.entropyToMnemonic(Buffer.from(seed));
      const keypair = spiltkey(
        encodescrypt(
          blakehasher().update(Buffer.from(mnemonic)).digest(),
          Buffer.from(uniqueKey)
        )
      );
      switch (type) {
        case KeyPairType.SINGLE:
          {
            // console.log("Generating edkeypair");
            ed25519SignatureKeyPair = sign.keyPair.fromSeed(keypair.key1);
            encryptionKeyPair = box.keyPair.fromSecretKey(
              ed25519SignatureKeyPair.secretKey.slice(0, 32)
            );
            encodeDID(ed25519SignatureKeyPair.publicKey);
          }
          break;
        case KeyPairType.HYBRID:
          {
            // console.log("Generating edkeypair+bls12381");
            ed25519SignatureKeyPair = sign.keyPair.fromSeed(keypair.key1);
            encryptionKeyPair = box.keyPair.fromSecretKey(
              ed25519SignatureKeyPair.secretKey.slice(0, 32)
            );
            signatureKeyPair = await BLS.generateKeyPair(keypair.key2);
            did = encodeDID(
              ed25519SignatureKeyPair.publicKey,
              signatureKeyPair.publicKeyBuffer
            );
          }
          break;
        default:
          throw new Error("Keypair type undefined");
      }
      return {
        seed,
        mnemonic,
        target,
        ed25519SignatureKeyPair,
        encryptionKeyPair,
        signatureKeyPair,
      };
    },

    async edsSign(clearText: Uint8Array): Promise<Uint8Array> {
      return new Promise<Uint8Array>((resolve, reject) => {
        try {
          const signature = sign.detached(
            clearText,
            ed25519SignatureKeyPair.secretKey
          );
          resolve(signature);
        } catch (error) {
          reject(error);
        }
      });
    },
    async edsVerifySignature(
      clearText: Uint8Array,
      signature: Uint8Array,
      aud?: string
    ): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        try {
          const d = aud ? decodeDid(aud) : decodeDid(did);
          resolve(
            sign.detached.verify(clearText, signature, d.encryptionPublickey)
          );
        } catch (error) {
          reject(error);
        }
      });
    },
    /**
     * Encode the current keypair, if a password is provided a password protected key is issued
     * @param password
     * @returns
     */
    async encodePkcs8(password?: string): Promise<Uint8Array> {
      if (password && password.length < 4)
        throw new Error("Password minimum length must be 4");
      console.log("edsecret length", ed25519SignatureKeyPair.secretKey.length);
      console.log("edpub length", ed25519SignatureKeyPair.publicKey.length);
      const ed25519encoded = Buffer.concat([
        PKCS8_HEADER,
        ed25519SignatureKeyPair.secretKey,
        PKCS8_DIVIDER,
        ed25519SignatureKeyPair.publicKey,
      ]);
      const blsencoded = Buffer.concat([
        PKCS8_HEADER,
        signatureKeyPair.privateKeyBuffer,
        PKCS8_DIVIDER,
        signatureKeyPair.publicKeyBuffer,
      ]);
      const seedencoded = Buffer.concat([PKCS8_HEADER, seed]);
      const targetencoded = Buffer.concat([PKCS8_HEADER, Buffer.from(target)]);
      const f = Buffer.concat([
        ed25519encoded,
        blsencoded,
        seedencoded,
        targetencoded,
      ]);
      if (!password) return f;
      const salt = randomBytes(SALT_LENGTH);
      const encodedpassword = encodescrypt(Buffer.from(password), salt);
      const nonce = randomBytes(NONCE_LENGTH);
      const encrypted = secretbox(
        f,
        nonce,
        encodedpassword.subarray(0, SEED_LENGTH)
      );
      return Buffer.concat([salt, nonce, encrypted]);
    },
    async decodePkcs8(
      bytes: Uint8Array,
      password?: string
    ): Promise<BaseKeyPair> {
      return new Promise<BaseKeyPair>(async (resolve, reject) => {
        try {
          let ed25519: Uint8Array;
          let bls: Uint8Array;
          let seed: Uint8Array;
          let target: Uint8Array;
          let decrypted: Buffer;
          if (password) {
            const salt = bytes.slice(0, SALT_LENGTH);
            const encodedpassword = encodescrypt(Buffer.from(password), salt);
            const nonce = bytes.slice(SALT_LENGTH, SALT_LENGTH + NONCE_LENGTH);
            const encrypted = bytes.subarray(
              SALT_LENGTH + NONCE_LENGTH,
              bytes.length + 1
            );
            const sol = secretbox.open(
              encrypted,
              nonce,
              encodedpassword.subarray(0, SEED_LENGTH)
            );
            if (sol) {
              decrypted = Buffer.from(sol);
            } else {
              throw new Error("Unable to decode nonce data");
            }
          } else {
            decrypted = Buffer.from(bytes);
          }
          if (!decrypted) throw new Error("Value is not available.");
          ed25519 = decrypted.slice(0, 117);
          bls = Buffer.from(decrypted.subarray(117, 267));
          seed = decrypted.subarray(266, 314);
          target = decrypted.subarray(313, decrypted.length + 1);
          const blsheader = Buffer.from(bls.slice(0, PKCS8_HEADER.length));
          assert(blsheader.equals(PKCS8_HEADER), "Header format invalid");
          const edheader = Buffer.from(ed25519.slice(0, PKCS8_HEADER.length));
          assert(edheader.equals(PKCS8_HEADER), "Header format invalid");
          const privatekey = ed25519.subarray(
            PKCS8_HEADER.length + 1,
            PKCS8_HEADER.length + EDPRIVATEKEYLENGTH + 1
          );
          const ed25519SignatureKeyPair =
            sign.keyPair.fromSecretKey(privatekey);
          const signatureKeyPair = await BLS.generateKeyPair(
            bls.subarray(
              PKCS8_HEADER.length + 1,
              PKCS8_HEADER.length + BLSPRIVATEKEYLENGTH + 1
            )
          );
          const seedvalue = Buffer.from(
            seed.slice(PKCS8_HEADER.length, seed.length)
          );
          const seedheader = Buffer.from(seed.slice(0, PKCS8_HEADER.length));
          assert(seedheader.equals(PKCS8_HEADER), "Seed Header format invalid");
          const targetvalue = Buffer.from(
            target.slice(PKCS8_HEADER.length + 1, target.length + 1)
          ).toString();
          const targetheader = Buffer.from(seed.slice(0, PKCS8_HEADER.length));
          assert(
            targetheader.equals(PKCS8_HEADER),
            "Target Header format invalid"
          );
          resolve({
            signatureKeyPair: signatureKeyPair,
            ed25519SignatureKeyPair: ed25519SignatureKeyPair,
            target: targetvalue,
            seed: seedvalue,
          });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
    lock() {
      isLocked = true;
    },
    unlock() {
      isLocked = false;
    },
    setMeta(newMeta: Meta): void {
      meta = Object.assign(meta, newMeta);
    },
    toJson() {
      return {
        encryptionprivatekey: Buffer.from(encryptionKeyPair.secretKey).toString(
          "base64"
        ),
        encryptionpublickey: Buffer.from(encryptionKeyPair.publicKey).toString(
          "base64"
        ),
        ed25519Signaturepublickey: Buffer.from(
          ed25519SignatureKeyPair.publicKey
        ).toString("base64"),
        ed25519Signatureprivatekey: Buffer.from(
          ed25519SignatureKeyPair.secretKey
        ).toString("base64"),
        signatureprivatekey: Buffer.from(
          signatureKeyPair.privateKeyBuffer
        ).toString("base64"),
        signaturepublickey: Buffer.from(signatureKeyPair.publicKey).toString(
          "base64"
        ),
        seed: Buffer.from(seed).toString("base64"),
        target: target,
        meta: meta,
      };
    },

    async blsSign(data: Uint8Array[]): Promise<Response> {
      return new Promise(async (resolve, reject) => {
        try {
          const keypair = signatureKeyPair;
          const bytes = await BLS.sign(keypair, data);
          const isSignatureVerificaton = await BLS.verifySignature(
            new Uint8Array(keypair.publicKeyBuffer),
            data,
            bytes
          );
          if (isSignatureVerificaton) {
            const signature = {
              id: nanoid(32),
              algo: "BLS_BBS2022_SIG",
              created: DateTime.now().toISO(),
              controller: did,
              proof: Buffer.from(bytes).toString("base64"),
            } as Signature;
            resolve({ signature, bytes });
          } else {
            reject(isSignatureVerificaton.error);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    async blsVerifySignature(
      clearText: Uint8Array[],
      signature: Signature
    ): Promise<boolean> {
      return new Promise<boolean>(async (resolve, reject) => {
        try {
          const response = await BLS.verifySignature(
            new Uint8Array(decodeDid(signature.controller).signaturePublickey),
            clearText,
            new Uint8Array(Buffer.from(signature.proof, "base64"))
          );
          if (response.error) {
            console.log(response.error);
            resolve(false);
          } else {
            resolve(response.verified);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    async createProof(
      data: Uint8Array[],
      signature: Uint8Array,
      revealed?: number[],
      nonce?: Uint8Array
    ): Promise<Proof> {
      return new Promise<Proof>(async (resolve, reject) => {
        try {
          // why do we have to copy the signature to a local memory
          // lets come back and check this
          const keypair = signatureKeyPair;
          const generatedNonce = nonce ? nonce : randomBytes(24);
          const reveal = revealed || data.map((value, index) => index);
          const proofValue = await BLS.createProof({
            signature: signature,
            publicKey: new Uint8Array(keypair.publicKeyBuffer),
            messages: data,
            nonce: generatedNonce,
            revealed: reveal,
          });
          const proof = {
            created: DateTime.now().toISO(),
            creator: did,
            verificationMethod: "AssertionProof",
            nonce: Buffer.from(generatedNonce).toString("base64"),
            proofValue: Buffer.from(proofValue).toString("base64"),
            revealed: reveal,
          } as Proof;
          resolve(proof);
        } catch (error) {
          reject(error);
        }
      });
    },
    async verifyProof(data: Uint8Array[], proof: Proof): Promise<boolean> {
      return new Promise<boolean>(async (resolve, reject) => {
        try {
          const result = await blsVerifyProof({
            proof: new Uint8Array(Buffer.from(proof.proofValue, "base64")),
            messages: data,
            publicKey: new Uint8Array(
              decodeDid(proof.creator).signaturePublickey
            ),
            nonce: new Uint8Array(Buffer.from(proof.nonce, "base64")),
          });
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result.verified);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
