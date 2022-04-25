import { BLAKE2Xs } from "@stablelib/blake2xs";

/**
 * BlakeHasher
 * @returns
 */

export function blakehasher() {
  return new BLAKE2Xs();
}
