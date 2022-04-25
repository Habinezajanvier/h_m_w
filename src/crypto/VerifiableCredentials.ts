import { Meta, verifyDIDFormat } from "../crypto/KeyPair";
import { MetaData } from "./interface/MetaData";
import { VerifiableCredential } from "./interface/VerifiableCredential";
import { DateTime, Duration } from "luxon";
import { KeyPair } from "./interface/KeyPair";
import { Proof } from "./classes/Proof";
import { Signature } from "./classes/Signature";
import { nanoid } from "nanoid";

export const DEFAULTEXPIRY = 11352960000;
export const DefaultDocumentType = [`VerifiableCredential`];

export const metaTypes = [
  "role",
  "firstName",
  "lastName",
  "postalAddress",
  "pincode",
  "country",
  "ePersonalAddress",
  "eOrganisationAddress",
  "email",
  "phoneNumber",
  "countryCode",
  "notificationToken",
  "deviceDIDList",
  "faceid",
];


export class VerifiableCredentials {



  private keypair: KeyPair;
  private id: string;
  private type: string[];
  private created: string;
  private updated: string;
  private meta: MetaData;
  private issuer: string;
  private holder: string;
  private organisation: string;
  private expiry: string;
  private aud: string[];
  private signature: Signature;
  private proof: Proof;

  constructor(keypair: KeyPair) {
    this.keypair = keypair;
    this.created = DateTime.now().toISO();
    this.type = DefaultDocumentType;
    this.setExpiry(DateTime.now().plus(DEFAULTEXPIRY).toISO());
    this.issuer = this.keypair.did;
    this.meta = {};
  }

  

  // Public Functions

  setExpiry(expiry: string) {
    if (!DateTime.fromISO(expiry).isValid) {
      throw new Error(`Invalid Expiry`);
    }
    this.expiry = expiry;
    this.updateTime();
  }

  setIssuer(issuer: string) {
    this.issuer = issuer;
    this.updateTime();
  }

  setHolder(holder: string) {
    this.holder = holder;
    this.updateTime();
  }

  setOrganisation(organisation: string) {
    this.organisation = organisation;
    this.updateTime();
  }

  setAudience(audience: string[]) {
    try {
      audience.map((a) => verifyDIDFormat(a));
      this.aud = audience;
      this.updateTime();
    } catch (error) {
      throw error
    }
  }

  setMeta(meta: Partial<MetaData>) {
    this.meta = Object.assign(this.meta, meta);
    this.updateTime();
  }

  // create  the verifiable credential
  async execute(): Promise<string> {
    if (Object.keys(this.meta).length <= 0)
      throw new Error(`Set Meta Information`);
    let data: Uint8Array[] = [];
    this.meta = Object.assign(
      this.meta,
      Object.keys(this.meta).reduce((a, c) => ((a[c] = this.meta[c]), a), {})
    );
    Object.keys(this.meta)
      .sort()
      .forEach(async (key) => {
        data.push(new Uint8Array(Buffer.from(this.meta[key])));
      });
    const { signature, bytes } = await this.keypair.blsSign(data);
    this.setSignature(signature);
    this.setProof(await this.keypair.createProof(data, bytes));
    this.id = nanoid(32);
    this.updateTime();
    return Buffer.from(JSON.stringify(this.toJSON())).toString("base64");
  }

  toJSON(): VerifiableCredential {
    return {
      id: this.id,
      type: this.type,
      created: this.created,
      updated: this.updated,
      issuer: this.issuer,
      holder: this.holder,
      organisation: this.organisation,
      expiry: this.expiry,
      aud: this.aud,
      meta: this.meta,
      signature: this.signature,
      proof: this.proof,
    } as VerifiableCredential;
  }

  toBase64() {
    return Buffer.from(JSON.stringify(this.toJSON()), "utf-8").toString(
      "base64"
    );
  }

  /**
   * Pass Base64 formatted Verifiable Credentials.
   * @param credentials
   */
  public static async verify(
    keypair: KeyPair,
    credentials: string
  ): Promise<boolean> {
    const { data, vc }: { data: Uint8Array[]; vc: VerifiableCredential } =
      VerifiableCredentials.extract(credentials);
    const signatureVerification = await keypair.blsVerifySignature(
      data,
      vc.signature
    );
    const proofVerification = await keypair.verifyProof(data, vc.proof);
    return signatureVerification && proofVerification;
  }

  /**
   * Derive credentials for issued credentials
   * @param keyPair
   * @param credentials
   * @param frame
   * @returns
   */
  public static async deriveCredentials(
    keyPair: KeyPair,
    credentials: string,
    frame: string[]
  ): Promise<string> {
    if (frame.length <= 0 || !frame.every((f) => metaTypes.includes(f)))
      throw new Error("Invalid frame");
    const { vc } = VerifiableCredentials.extract(credentials);
    const derivedVC = new VerifiableCredentials(keyPair);
    derivedVC.setHolder(keyPair.did);
    derivedVC.setOrganisation(vc.organisation);
    derivedVC.setMeta(
      frame
        .filter((key) => key in vc.meta)
        .reduce(
          (obj2, key) => ((obj2[key] = vc.meta[key]), obj2),
          {}
        ) as MetaData
    );
    const derivedCredentials = await derivedVC.execute();
    return derivedCredentials;
  }

  // Private internal Functions

  private updateTime(): void {
    this.updated = DateTime.now().toISO();
  }

  private setProof(proof: Proof) {
    this.proof = proof;
    this.updateTime();
  }

  private setSignature(signature: Signature) {
    this.signature = signature;
    this.updateTime();
  }

  /**
   * Extract Credentials
   * @param credentials
   * @param frame
   * @returns
   */
  private static extract(credentials: string, frame?: string[]) {
    const vc = JSON.parse(
      Buffer.from(credentials, "base64").toString("utf-8")
    ) as unknown as VerifiableCredential;
    let data: Uint8Array[] = VerifiableCredentials.metaToBytes(vc, frame);
    if (frame && !frame.every((f) => Object.keys(vc.meta).includes(f)))
      throw new Error(`${frame} does not exist in the credentials ${vc.meta}`);
    return { data, vc };
  }

  /**
   * Convert MetaData to Bytes
   * @param vc 
   * @param frame 
   * @returns 
   */
  private static metaToBytes(vc: VerifiableCredential, frame?: string[]) {
    let data: Uint8Array[] = [];
    Object.keys(vc.meta)
      .sort()
      .forEach(async (key) => {
        frame && frame.includes(key)
          ? data.push(new Uint8Array(Buffer.from(vc.meta[key])))
          : data.push(new Uint8Array(Buffer.from(vc.meta[key])));
      });
    return data;
  }
}
