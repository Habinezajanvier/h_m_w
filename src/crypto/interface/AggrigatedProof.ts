import { IAggrigateProof } from './IAggrigateProof';


export class AggrigatedProof implements IAggrigateProof {
    created: string;
    verificationMethod: string;
    type: string;
    aud: string[];
    signers: string[];
    proofPurpose: string;
    proofValue: string;
    evidence: string;
    nonce: string;
}
