import IProof from './IProof';


export interface IAggrigateProof extends IProof {
    created: string;
    verificationMethod: string;
    type: string;
    aud: string[];
    signers: string[];
    proofValue: string;
    evidence: string;
}
