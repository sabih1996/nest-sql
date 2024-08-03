import * as crypto from 'crypto';

const SALT_LENGTH = 16; // Length of the salt
const HASH_ITERATIONS = 10000; // Number of iterations for PBKDF2
const KEY_LENGTH = 64; // Length of the derived key
const DIGEST = 'sha512'; // Hashing algorithm

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex');
  return `${salt}:${hash}`;
};

export const comparePassword = (
  password: string,
  storedHash: string,
): boolean => {
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex');
  return hash === originalHash;
};
