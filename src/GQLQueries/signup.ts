// user registration
export const registerMutation = `
mutation(
  $id: ID!, 
  $did: String!,
  $createdTime: String!,
  $metaInformation: MetaData!,
  $proofOfPossession: JSON!,
  $signature: InputSignature!
  $registrationType: RegistrationType!
  ){
  register(signup: 
    {
    id: $id,
    did: $did,
    createdTime: $createdTime,
    metaInformation: $metaInformation,
    proofOfPossession: $proofOfPossession,
    signature: $signature,
    registrationType:  $registrationType
  }
  
  ){
    id,
    peerId,
    createdTime,
    controller,
    approverDid,
    system_approved,
    organisationDID,
    organisation_approved,
    registrationState,
    root,
    graph,
    proof,
    blacklisted,
    signature,
  }
}
`;

//  sending OTP
export const sendOTPMutation = `
mutation(
  $target: String!, 
){
  otp(target: $target, regenerate: true)
}
`;

// OTP verification
export const verifyOTPMutation = `
mutation(
  $token: String!,
  $target: String!, 
){
  verifyotp(token: $token, target: $target)
}
`;

export const ewayBillsQuery = `
query(){
  {
    getEWayBills(limit: 1000){
      id
      ewayBillNumber
      validfrom
      validto
      toDid
      toLocation
    }
  }
}
`;
