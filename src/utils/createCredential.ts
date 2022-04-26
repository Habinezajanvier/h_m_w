import t from "tap";
import "reflect-metadata";

import { container } from "tsyringe";

import { createKeypair, KeyPairType } from "../crypto/KeyPair";
import { VerifiableCredentials } from "../crypto/VerifiableCredentials";
import { randomBytes } from "crypto";

t.test("Verifiable Credentials", async (t) => {
  const kp = createKeypair();
  const target = "+918296133121";
  const target2 = "+918296133122";
  const target3 = "+918296133123";
  const target4 = "+918296133124";

  const seed = new Uint8Array([
    237, 105, 164, 199, 230, 245, 85, 91, 9, 189, 253, 159, 154, 210, 30, 210,
    68, 245, 182, 146, 13, 206, 156, 146, 110, 212, 115, 240, 178, 83, 226, 132,
  ]);
  const seed2 = randomBytes(32);
  const seed3 = randomBytes(32);
  const seed4 = randomBytes(32);
  const kp2 = createKeypair();
  const kp3 = createKeypair();
  const kp4 = createKeypair();
  await kp2.derive(target2, KeyPairType.HYBRID, seed2);
  await kp3.derive(target3, KeyPairType.HYBRID, seed3);
  await kp4.derive(target4, KeyPairType.HYBRID, seed4);

  t.test("Verifiable Credentials basic execution", async (t) => {
    const vc = new VerifiableCredentials(kp2);
    vc.setHolder(kp3.did);
    vc.setOrganisation(kp2.did);
    vc.setMeta({
      firstName: "bhavish",
      lastName: "Agarwal",
      countryCode: "91",
      phoneNumber: "8296133177",
    });
    console.log(await vc.execute());
    console.log(vc.toJSON());
  });
  t.test("Verifiable Credentials basic execution", async (t) => {
    const vc = new VerifiableCredentials(kp2);
    vc.setHolder(kp3.did);
    vc.setOrganisation(kp2.did);
    vc.setAudience([kp2.did, kp3.did, kp4.did]);
    vc.setMeta({
      firstName: "bhavish",
      lastName: "Agarwal",
      countryCode: "91",
      phoneNumber: "8296133177",
    });
    console.log();
    console.log(vc.toJSON());
    const credential = await vc.execute();
    console.log(await VerifiableCredentials.verify(kp4, await vc.execute()));
    const frame = ["firstName", "phoneNumber"];
    console.log(
      await VerifiableCredentials.deriveCredentials(kp4, credential, frame)
    );
  });
});