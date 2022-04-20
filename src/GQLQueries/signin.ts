export const signinMutation = `
mutation(
  $id: ID!, 
  $did: String!,
  $createdTime: String!,
  $proofOfPossession: JSON,
  $signature: Signature!
) {
 login(login:{
  id: $id,
  createdTime: $createdTime,
  proofOfPossession: $proofOfPossession,
    graph: {},
    root: "",
    did: $did,
    proof:{},
    event: {},
    role: "admin"
    signature: $signature
  }
  ){
    id,
    accesstoken,
    createdTime,
    organisationDID,
    approved,
    approverDid,
    registrationState,
  }
}

`;
