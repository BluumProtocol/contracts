import { BytesLike, ethers } from 'ethers';
import { Buffer } from 'buffer';

// Fonction pour calculer le hash d'une chaîne de caractères
export function calculateHash(_string: string): string {
    // converts the string to a byte array
    const buffer = Buffer.from(_string, 'utf-8');
    return ethers.utils.keccak256(buffer);
}

// Fonction pour convertir une chaîne de caractères en bytes32
export function stringToBytes32(input: string): BytesLike {
    // converts the string to a buffer
    const inputBytes = ethers.utils.toUtf8Bytes(input);
    const inputHex = ethers.utils.hexlify(inputBytes);
    const paddedInputHex = inputHex.padEnd(66, '0');
    return paddedInputHex;
}

// Fonction pour convertir un hex en string
export const hexToString = (hex: string) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      const hexValue = hex.substr(i, 2);
      const decimalValue = parseInt(hexValue, 16);
      str += String.fromCharCode(decimalValue);
    }
    return str;
  };
