export default interface IProof{
    type?:string;
    created?:string
    verificationMethod?:string
    proofPurpose?:string
    proofValue?:string
    evidence?:string
    nonce:string    
    creator?:string
    signer?:string
    signature?: string
}