import { nanoid } from "nanoid";

export const getSigninTokens = () => {
  const id = "mYjPFRWyZ5xtDiF1LVqy7crf43CGZs5Z"; //nanoid(32);
  const did =
    "did:ckdr:Ee3qAE2LEggN7xR0eELYDzFnr/4h7cjv3sVkxATG1ocP1zvjiaPuIkmSWCwAm7P/B/ph+Nu2NJJm/pTsqSHfcUr37KrkX28j3OPYc/885gyP6OKDELLf1hlZmwyxY1zVOQnR7kD2n6dnoXGvNtVfJ/t/U80oVQVO7BFQnXNTLiMKkcL8";

  const proofOfPossession = {
    kty: "EC",
    crv: "Bls12381G2",
    x:
      "iaPuIkmSWCwAm7P_B_ph-Nu2NJJm_pTsqSHfcUr37KrkX28j3OPYc_885gyP6OKDELLf1hlZmwyxY1zVOQnR7kD2n6dnoXGvNtVfJ_t_U80oVQVO7BFQnXNTLiMKkcL8",
  };

  const signature = {
    id: "cNw1Hby-I9Vip8YVzUsWISXkPtjD1zaL",
    nonce: "ew4SBDRh9j/qXyXd4ZLGb9ii7nN20SR4",
    aud: "did:ckdr:Ee3qAE2LEggN7xR0eELYDzFnr/4h7cjv3sVkxATG1ocP1zvjiaPuIkmSWCwAm7P/B/ph+Nu2NJJm/pTsqSHfcUr37KrkX28j3OPYc/885gyP6OKDELLf1hlZmwyxY1zVOQnR7kD2n6dnoXGvNtVfJ/t/U80oVQVO7BFQnXNTLiMKkcL8",
    proof: "hHhUHKTAAK3b6rZbhpIpGXBV9GLPrB2JTfon+wzK+mhgVQBjzuvHDHs8QdMoMkfICAdlxw7M85gnUv71tbThopNqHaUNn72SzjJXbOpTks82oUhyEvWjPGTz1fddo/Pa+/ZG4Tt+jf7eOjc3zNg/aQ==",
  };

  return {
    id,
    did,
    createdTime: "2022-04-11T10:17:12.914Z",
    proofOfPossession,
    signature,
  };
};
