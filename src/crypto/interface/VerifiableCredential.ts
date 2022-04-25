import { Proof } from "../classes/Proof";
import { Signature } from "../classes/Signature";
import { KeyPair } from "./KeyPair";
import { MetaData } from "./MetaData";


export interface VerifiableCredential {
    id: string;
    type: string[];
    created: string;
    updated: string;
    meta: MetaData
    issuer: string;
    holder: string;
    organisation: string;
    expiry: string;
    aud: string[];
    signature: Signature;
    proof: Proof;
}