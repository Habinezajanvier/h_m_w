import { randomBytes } from "crypto";
import { createKeypair, KeyPairType } from "../crypto/KeyPair";
import { VerifiableCredentials } from "../crypto/VerifiableCredentials";

export const testVCGeneration = async () => {
  const target4 = "+918296133124";
  const seed4 = new Uint8Array([
    237,
    105,
    164,
    199,
    230,
    245,
    85,
    91,
    9,
    189,
    253,
    159,
    154,
    210,
    30,
    210,
    68,
    245,
    182,
    146,
    13,
    206,
    156,
    146,
    110,
    212,
    115,
    240,
    178,
    83,
    226,
    132,
  ]);

  const kp4 = createKeypair();

  await kp4.derive(target4, KeyPairType.HYBRID, seed4);

  const vc = new VerifiableCredentials(kp4);
  vc.setHolder(kp4.did);
  vc.setOrganisation(kp4.did);
  vc.setAudience([kp4.did]);
  vc.setMeta({
    firstName: "bhavish",
    lastName: "Agarwal",
    countryCode: "91",
    phoneNumber: "8296133177",
  });
  //   console.log(vc.toJSON());
  const credential = await vc.execute();
  //   console.log(await VerifiableCredentials.verify(kp4, await vc.execute()));
  const frame = ["firstName", "phoneNumber"];
  //   console.log(
  //     await VerifiableCredentials.deriveCredentials(kp4, credential, frame)
  //   );

  console.log("credentails: ", credential);
  console.log(
    "VC: ",
    await VerifiableCredentials.deriveCredentials(kp4, credential, frame)
  );
};
