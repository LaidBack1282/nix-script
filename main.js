#!/usr/bin/env node

const base32Alphabet = '0123456789abcdfghijklmnpqrsvwxyz';
const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base32ToBase64(base32String) {
  let bits = '';
  for (const character of base32String) {
    const val = base32Alphabet.indexOf(character.toLowerCase());
    if (val === -1) {
      throw new Error('Invalid character in base32 string.');
    }
    bits += val.toString(2).padStart(5, '0');
  }

  let base64String = '';
  for (let i = 0; i < bits.length; i += 6) {
    const segment = bits.substring(i, i + 6);
    if (segment.length === 6) {
      const index = parseInt(segment, 2);
      base64String += base64Alphabet[index];
    } else {
      const index = parseInt(segment.padEnd(6, '0'), 2);
      base64String += base64Alphabet[index];
      base64String += '='.repeat((6 - segment.length) / 2);
    }
  }

  return base64String;
}

const hashBase32 = process.argv[2];
console.log(base32ToBase64(hashBase32));